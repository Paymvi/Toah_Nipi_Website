-- Simplified blog publishing: sign in (password), upload a PDF, publish.
--
-- Safe to run whether or not 20261120000000_local_approval.sql was applied:
-- every step uses IF EXISTS / CREATE OR REPLACE. No posts, published PDFs,
-- accounts or editor access are changed or deleted.
--
-- What changes:
--   * Editors no longer need MFA. Access still requires being listed in
--     private.blog_editors, checked by the database on every request.
--   * No virus scan or manual approval. A Vercel function validates each PDF's
--     structure (api/_lib/pdf-check.js) and, if it passes, attaches it to the
--     post in one transaction. This is not antivirus scanning.
--   * Uploads that were waiting for local approval (if that migration ran) are
--     withdrawn; editors re-upload those PDFs. Published PDFs are untouched.

-- Editor check: allowlist only (no MFA level) -------------------------------
create or replace function private.is_blog_editor() returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from private.blog_editors e where e.user_id = auth.uid());
$$;

-- Status and audit values: keep every value earlier versions may have stored -
alter table public.blog_uploads drop constraint if exists blog_uploads_status_check;
alter table public.blog_uploads add constraint blog_uploads_status_check check (status in (
  'awaiting_upload', 'pending_review', 'processing', 'rejected', 'approved',
  'attached', 'superseded', 'deleting', 'deleted'
));

alter table public.blog_audit_log drop constraint if exists blog_audit_log_action_check;
alter table public.blog_audit_log add constraint blog_audit_log_action_check check (action in (
  'created', 'edited', 'published', 'unpublished', 'pdf_submitted', 'pdf_attached',
  'pdf_replaced', 'deleted', 'upload_approved', 'upload_rejected', 'files_cleaned'
));

-- Withdraw uploads that were waiting for the (removed) local approver; the
-- daily-ish cleanup deletes their private quarantine copies.
update public.blog_uploads
set status = 'superseded', superseded_at = now()
where status = 'pending_review';

-- Remove functions of the earlier approval designs -------------------------
drop function if exists public.blog_submit_upload(uuid);
drop function if exists public.blog_claim_pending();
drop function if exists public.blog_release_upload(uuid);
drop function if exists public.blog_attach_upload(uuid, uuid);

-- Called by the upload function WITH THE EDITOR'S TOKEN, so the database
-- checks the session, editor membership and upload ownership itself.
create or replace function public.blog_claim_upload(p_upload_id uuid)
returns table (post_id uuid, original_filename text)
language plpgsql security definer set search_path = ''
as $$
begin
  perform private.require_editor();

  return query
  update public.blog_uploads u
  set status = 'processing', processed_at = now()
  where u.id = p_upload_id and u.created_by = auth.uid() and u.status = 'awaiting_upload'
  returning u.post_id, u.original_filename;

  if not found then
    raise exception 'That upload was not found or was already processed.' using errcode = 'P0002';
  end if;
end;
$$;

-- Server only: record the validation result. A valid PDF replaces the post's
-- PDF in the same transaction; the previous PDF stays live until this commits.
create or replace function public.blog_finish_upload(
  p_upload_id uuid, p_ok boolean, p_reason text,
  p_byte_size bigint, p_sha256 text, p_page_count int, p_scan_result text
) returns void
language plpgsql security definer set search_path = ''
as $$
declare
  v_upload public.blog_uploads;
  v_post public.blog_posts;
begin
  update public.blog_uploads
  set status = case when p_ok then 'approved' else 'rejected' end,
      reject_reason = case when p_ok then null else left(p_reason, 500) end,
      byte_size = p_byte_size, sha256 = p_sha256, page_count = p_page_count,
      scan_result = case when p_ok then 'not_scanned' end, -- validated, not virus-scanned
      processed_at = now()
  where id = p_upload_id and status = 'processing'
  returning * into v_upload;
  if not found then
    raise exception 'Upload % is not being processed.', p_upload_id;
  end if;

  select * into v_post from public.blog_posts where id = v_upload.post_id for update;

  perform private.audit(
    case when p_ok then 'upload_approved' else 'upload_rejected' end,
    v_upload.post_id, v_post.title,
    jsonb_strip_nulls(jsonb_build_object('upload_id', p_upload_id, 'uploaded_by', v_upload.created_by,
      'filename', v_upload.original_filename, 'reason', p_reason)));

  if not p_ok or v_post.id is null then
    return; -- invalid, or the post was deleted meanwhile (cleanup removes the file)
  end if;

  update public.blog_uploads set status = 'attached' where id = p_upload_id;
  update public.blog_uploads set status = 'superseded', superseded_at = now()
  where id = v_post.pdf_upload_id;
  update public.blog_posts
  set pdf_upload_id = p_upload_id, updated_by = v_upload.created_by, updated_at = now()
  where id = v_post.id;

  perform private.audit(
    case when v_post.pdf_upload_id is null then 'pdf_attached' else 'pdf_replaced' end,
    v_post.id, v_post.title,
    jsonb_build_object('upload_id', p_upload_id, 'filename', v_upload.original_filename,
      'uploaded_by', v_upload.created_by, 'previous_upload_id', v_post.pdf_upload_id));
end;
$$;

-- Never selects a post's current PDF ('attached').
create or replace function public.blog_claim_cleanup()
returns table (id uuid)
language sql security definer set search_path = ''
as $$
  update public.blog_uploads u
  set status = 'deleting'
  where u.id in (
    select x.id from public.blog_uploads x
    where (x.status in ('awaiting_upload', 'processing', 'rejected', 'pending_review')
           and x.created_at < now() - interval '1 day')
       or (x.status = 'approved' and x.processed_at < now() - interval '1 day')
       or (x.status = 'superseded' and x.superseded_at < now() - interval '1 day')
       or x.status = 'deleting' -- retry a previous run that failed part-way
    for update skip locked
  )
  returning u.id;
$$;

create or replace function public.blog_delete_post(p_id uuid)
returns void
language plpgsql security definer set search_path = ''
as $$
declare
  v_post public.blog_posts;
begin
  perform private.require_editor();

  select * into v_post from public.blog_posts where id = p_id for update;
  if not found then
    raise exception 'That post no longer exists.' using errcode = 'P0002';
  end if;

  delete from public.blog_posts where id = p_id;
  update public.blog_uploads
  set status = 'superseded', superseded_at = now()
  where post_id = p_id and status in ('awaiting_upload', 'pending_review', 'approved', 'attached');

  perform private.audit('deleted', p_id, v_post.title,
    jsonb_build_object('was_published', v_post.status = 'published'));
end;
$$;

-- Grants (re-stated so both starting states end up identical) -------------
revoke all on function public.blog_claim_upload(uuid),
  public.blog_finish_upload(uuid, boolean, text, bigint, text, int, text),
  public.blog_claim_cleanup(), public.blog_delete_post(uuid)
  from public, anon, authenticated;
grant execute on function public.blog_claim_upload(uuid), public.blog_delete_post(uuid) to authenticated;
grant execute on function
  public.blog_finish_upload(uuid, boolean, text, bigint, text, int, text),
  public.blog_claim_cleanup()
  to service_role;
