-- Blog management for the public Toah Nipi website.
--
-- This runs in the WEBSITE's own Supabase project. It has nothing to do with
-- the booking software's project, users, roles or buckets.
--
-- Security model (see BLOG_ADMIN_SETUP.md):
--   * Signing in grants nothing. A user can manage posts only when their id is
--     in private.blog_editors AND their session has passed MFA (aal2).
--   * private.* is not exposed through the API, so nobody can add themselves
--     as an editor. Editors are added in the SQL editor by the project owner.
--   * Clients cannot write tables directly. Every change goes through the
--     functions below, which check the editor role and write the audit log.
--   * Anonymous visitors can only call blog_list_published() and read PDFs
--     attached to published posts.

-- ---------------------------------------------------------------------------
-- Editors (permission data, unreachable from the API)
-- ---------------------------------------------------------------------------
create schema if not exists private;
revoke all on schema private from public;
-- Storage policies run as anon/authenticated and call private.* functions.
grant usage on schema private to anon, authenticated;

create table private.blog_editors (
  user_id uuid primary key references auth.users (id) on delete cascade,
  note text,
  added_at timestamptz not null default now()
);
revoke all on private.blog_editors from public, anon, authenticated;
-- Defense in depth: RLS with deliberately NO policies, so even if a grant or
-- API exposure were added by mistake, clients would see no rows. The
-- security-definer checks below run as the table owner (postgres), which
-- bypasses RLS, so they keep working. Do not add FORCE ROW LEVEL SECURITY.
alter table private.blog_editors enable row level security;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
-- One row per uploaded file. The storage names are derived from the id only:
--   quarantine:  blog-uploads/incoming/<id>.pdf
--   approved:    blog-files/<id>.pdf
-- The user's filename is display text only and never used as a path.
create table public.blog_uploads (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null, -- no FK: upload rows outlive deleted posts until cleanup
  status text not null default 'awaiting_upload' check (status in (
    'awaiting_upload', -- row created, browser may upload to quarantine once
    'processing',      -- server is validating/scanning
    'rejected',        -- failed validation or scan
    'approved',        -- copied to blog-files, not yet attached to the post
    'attached',        -- the post's current PDF
    'superseded',      -- replaced or post deleted; cleanup deletes it later
    'deleting',        -- claimed by cleanup
    'deleted'
  )),
  original_filename text not null check (char_length(original_filename) between 1 and 255),
  byte_size bigint,
  sha256 text,
  page_count int,
  scan_result text check (scan_result in ('clean', 'not_scanned')),
  reject_reason text,
  created_by uuid not null,
  created_at timestamptz not null default now(),
  processed_at timestamptz,
  superseded_at timestamptz
);
create index blog_uploads_cleanup_idx on public.blog_uploads (status);
create index blog_uploads_created_by_idx on public.blog_uploads (created_by, created_at);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (
    char_length(title) between 1 and 150
    and title = btrim(title)
    and title !~ '[[:cntrl:]]'
  ),
  description text not null default '' check (
    char_length(description) <= 500
    and description !~ '[\x01-\x09\x0b-\x1f\x7f]'
  ),
  status text not null default 'draft' check (status in ('draft', 'published')),
  pdf_upload_id uuid unique references public.blog_uploads (id),
  created_by uuid not null,
  created_at timestamptz not null default now(),
  updated_by uuid not null,
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  published_by uuid,
  constraint blog_posts_published_needs_pdf check (status = 'draft' or pdf_upload_id is not null)
);
create index blog_posts_published_idx on public.blog_posts (status, published_at desc);

-- Append-only: written only by the security-definer functions below.
create table public.blog_audit_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor uuid,          -- null = the server (validation, cleanup)
  actor_email text,
  action text not null check (action in (
    'created', 'edited', 'published', 'unpublished', 'pdf_attached',
    'pdf_replaced', 'deleted', 'upload_approved', 'upload_rejected', 'files_cleaned'
  )),
  post_id uuid,
  post_title text,
  details jsonb not null default '{}'
);
create index blog_audit_log_post_idx on public.blog_audit_log (post_id, at desc);
create index blog_audit_log_actor_idx on public.blog_audit_log (actor, at desc);

alter table public.blog_uploads enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_audit_log enable row level security;

-- Deny by default: remove Supabase's default table grants, then allow
-- editors to read (never write) through RLS.
revoke all on public.blog_uploads, public.blog_posts, public.blog_audit_log
  from public, anon, authenticated;
grant select on public.blog_uploads, public.blog_posts, public.blog_audit_log
  to authenticated;

-- ---------------------------------------------------------------------------
-- Permission checks
-- ---------------------------------------------------------------------------
create function private.is_blog_editor() returns boolean
language sql stable security definer set search_path = ''
as $$
  select coalesce(auth.jwt() ->> 'aal', '') = 'aal2'
    and exists (select 1 from private.blog_editors e where e.user_id = auth.uid());
$$;

create policy "editors read posts" on public.blog_posts
  for select to authenticated using ((select private.is_blog_editor()));
create policy "editors read uploads" on public.blog_uploads
  for select to authenticated using ((select private.is_blog_editor()));
create policy "editors read audit log" on public.blog_audit_log
  for select to authenticated using ((select private.is_blog_editor()));

create function private.audit(
  p_action text, p_post_id uuid, p_post_title text, p_details jsonb default '{}'
) returns void
language sql security definer set search_path = ''
as $$
  insert into public.blog_audit_log (actor, actor_email, action, post_id, post_title, details)
  values (auth.uid(), auth.jwt() ->> 'email', p_action, p_post_id, p_post_title, coalesce(p_details, '{}'));
$$;

-- Every editor function starts with this.
create function private.require_editor() returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if not private.is_blog_editor() then
    raise exception 'You are not authorized to manage blog posts.' using errcode = '42501';
  end if;
  if (select count(*) from public.blog_audit_log
      where actor = auth.uid() and at > now() - interval '10 minutes') >= 100 then
    raise exception 'Too many changes in a short time. Please wait a few minutes and try again.'
      using errcode = '53400';
  end if;
end;
$$;

create function private.clean_text(p text) returns text
language sql immutable set search_path = ''
as $$ select btrim(replace(coalesce(p, ''), E'\r\n', E'\n')); $$;

create function private.check_post_fields(p_title text, p_description text) returns void
language plpgsql immutable set search_path = ''
as $$
begin
  if char_length(p_title) = 0 then
    raise exception 'Please enter a title.' using errcode = '22023';
  elsif char_length(p_title) > 150 then
    raise exception 'The title can be at most 150 characters.' using errcode = '22023';
  elsif p_title ~ '[[:cntrl:]]' then
    raise exception 'The title must be a single line of plain text.' using errcode = '22023';
  elsif char_length(p_description) > 500 then
    raise exception 'The description can be at most 500 characters.' using errcode = '22023';
  elsif p_description ~ '[\x01-\x09\x0b-\x1f\x7f]' then
    raise exception 'The description contains characters that are not allowed.' using errcode = '22023';
  end if;
end;
$$;

-- Storage: may this user upload this quarantine object right now?
create function private.can_upload_blog_file(p_name text) returns boolean
language sql stable security definer set search_path = ''
as $$
  select private.is_blog_editor() and exists (
    select 1 from public.blog_uploads u
    where 'incoming/' || u.id::text || '.pdf' = p_name
      and u.status = 'awaiting_upload'
      and u.created_by = auth.uid()
      and u.created_at > now() - interval '1 hour'
  );
$$;

-- Storage: is this approved file attached to a published post?
create function private.is_public_blog_file(p_name text) returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.blog_posts p
    where p.status = 'published' and p.pdf_upload_id::text || '.pdf' = p_name
  );
$$;

revoke all on all functions in schema private from public;
grant execute on function private.is_blog_editor() to anon, authenticated;
grant execute on function private.can_upload_blog_file(text) to authenticated;
grant execute on function private.is_public_blog_file(text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Public read
-- ---------------------------------------------------------------------------
create function public.blog_list_published()
returns table (id uuid, title text, description text, published_at timestamptz, pdf_file text)
language sql stable security definer set search_path = ''
as $$
  select p.id, p.title, p.description, p.published_at, p.pdf_upload_id::text || '.pdf'
  from public.blog_posts p
  where p.status = 'published'
  order by p.published_at desc;
$$;

-- Lets the staff page explain "signed in, but not an editor" vs "needs MFA".
create function public.blog_editor_status() returns jsonb
language sql stable security definer set search_path = ''
as $$
  select jsonb_build_object(
    'is_editor', exists (select 1 from private.blog_editors e where e.user_id = auth.uid()),
    'aal', coalesce(auth.jwt() ->> 'aal', '')
  );
$$;

-- ---------------------------------------------------------------------------
-- Editor actions
-- ---------------------------------------------------------------------------
create function public.blog_create_post(p_title text, p_description text default '')
returns uuid
language plpgsql security definer set search_path = ''
as $$
declare
  v_title text := private.clean_text(p_title);
  v_description text := private.clean_text(p_description);
  v_id uuid;
begin
  perform private.require_editor();
  perform private.check_post_fields(v_title, v_description);

  insert into public.blog_posts (title, description, created_by, updated_by)
  values (v_title, v_description, auth.uid(), auth.uid())
  returning id into v_id;

  perform private.audit('created', v_id, v_title);
  return v_id;
end;
$$;

create function public.blog_update_post(p_id uuid, p_title text, p_description text default '')
returns void
language plpgsql security definer set search_path = ''
as $$
declare
  v_title text := private.clean_text(p_title);
  v_description text := private.clean_text(p_description);
  v_post public.blog_posts;
begin
  perform private.require_editor();
  perform private.check_post_fields(v_title, v_description);

  select * into v_post from public.blog_posts where id = p_id for update;
  if not found then
    raise exception 'That post no longer exists.' using errcode = 'P0002';
  end if;
  if v_post.title = v_title and v_post.description = v_description then
    return;
  end if;

  update public.blog_posts
  set title = v_title, description = v_description, updated_by = auth.uid(), updated_at = now()
  where id = p_id;

  perform private.audit('edited', p_id, v_title, jsonb_strip_nulls(jsonb_build_object(
    'old_title', nullif(v_post.title, v_title),
    'description_changed', v_post.description is distinct from v_description
  )));
end;
$$;

create function public.blog_set_published(p_id uuid, p_published boolean)
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
  if p_published and v_post.pdf_upload_id is null then
    raise exception 'Add a PDF before publishing.' using errcode = '22023';
  end if;
  if (v_post.status = 'published') = p_published then
    return;
  end if;

  update public.blog_posts
  set status = case when p_published then 'published' else 'draft' end,
      published_at = case when p_published then coalesce(published_at, now()) else published_at end,
      published_by = case when p_published then auth.uid() else published_by end,
      updated_by = auth.uid(),
      updated_at = now()
  where id = p_id;

  perform private.audit(case when p_published then 'published' else 'unpublished' end, p_id, v_post.title);
end;
$$;

create function public.blog_delete_post(p_id uuid)
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
  -- The file stops being public immediately (no published post references it)
  -- and is deleted by the daily cleanup.
  update public.blog_uploads
  set status = 'superseded', superseded_at = now()
  where post_id = p_id and status in ('approved', 'attached');

  perform private.audit('deleted', p_id, v_post.title,
    jsonb_build_object('was_published', v_post.status = 'published'));
end;
$$;

-- Reserve a quarantine slot. The browser may then upload exactly one file to
-- blog-uploads/incoming/<returned id>.pdf within the next hour.
create function public.blog_begin_upload(p_post_id uuid, p_filename text, p_size bigint)
returns uuid
language plpgsql security definer set search_path = ''
as $$
declare
  v_name text := btrim(coalesce(p_filename, ''));
  v_id uuid;
begin
  perform private.require_editor();

  if not exists (select 1 from public.blog_posts where id = p_post_id) then
    raise exception 'That post no longer exists.' using errcode = 'P0002';
  end if;
  if char_length(v_name) not between 5 and 255 or v_name ~ '[[:cntrl:]]' or lower(v_name) !~ '\.pdf$' then
    raise exception 'Please choose a PDF file (its name must end in .pdf).' using errcode = '22023';
  end if;
  if p_size is null or p_size < 1 or p_size > 20 * 1024 * 1024 then
    raise exception 'PDFs must be 20 MB or smaller.' using errcode = '22023';
  end if;
  if (select count(*) from public.blog_uploads
      where created_by = auth.uid() and created_at > now() - interval '1 hour') >= 30 then
    raise exception 'Too many uploads in the last hour. Please try again later.' using errcode = '53400';
  end if;

  insert into public.blog_uploads (post_id, original_filename, created_by)
  values (p_post_id, v_name, auth.uid())
  returning id into v_id;
  return v_id;
end;
$$;

-- Called by the server's validation endpoint WITH THE EDITOR'S TOKEN, so the
-- database itself verifies the session, role and MFA before any processing.
create function public.blog_claim_upload(p_upload_id uuid)
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

-- Swap the post's PDF in one transaction. The old PDF stays live until this
-- commits, and is then marked superseded for delayed cleanup.
create function public.blog_attach_upload(p_post_id uuid, p_upload_id uuid)
returns void
language plpgsql security definer set search_path = ''
as $$
declare
  v_post public.blog_posts;
  v_upload public.blog_uploads;
begin
  perform private.require_editor();

  select * into v_post from public.blog_posts where id = p_post_id for update;
  if not found then
    raise exception 'That post no longer exists.' using errcode = 'P0002';
  end if;
  -- Row lock serializes with cleanup, which only claims rows it can lock.
  select * into v_upload from public.blog_uploads where id = p_upload_id for update;
  if not found or v_upload.post_id <> p_post_id then
    raise exception 'That upload does not belong to this post.' using errcode = '42501';
  end if;
  if v_upload.status <> 'approved' then
    raise exception 'That PDF has not passed checks or has expired. Please upload it again.'
      using errcode = '22023';
  end if;

  update public.blog_uploads set status = 'attached' where id = p_upload_id;
  update public.blog_uploads set status = 'superseded', superseded_at = now()
  where id = v_post.pdf_upload_id;
  update public.blog_posts
  set pdf_upload_id = p_upload_id, updated_by = auth.uid(), updated_at = now()
  where id = p_post_id;

  perform private.audit(
    case when v_post.pdf_upload_id is null then 'pdf_attached' else 'pdf_replaced' end,
    p_post_id, v_post.title,
    jsonb_build_object('upload_id', p_upload_id, 'filename', v_upload.original_filename,
                       'previous_upload_id', v_post.pdf_upload_id));
end;
$$;

-- ---------------------------------------------------------------------------
-- Server-only (service role) functions
-- ---------------------------------------------------------------------------
create function public.blog_finish_upload(
  p_upload_id uuid, p_ok boolean, p_reason text,
  p_byte_size bigint, p_sha256 text, p_page_count int, p_scan_result text
) returns void
language plpgsql security definer set search_path = ''
as $$
declare
  v_upload public.blog_uploads;
begin
  update public.blog_uploads
  set status = case when p_ok then 'approved' else 'rejected' end,
      reject_reason = case when p_ok then null else left(p_reason, 500) end,
      byte_size = p_byte_size, sha256 = p_sha256, page_count = p_page_count,
      scan_result = p_scan_result, processed_at = now()
  where id = p_upload_id and status = 'processing'
  returning * into v_upload;
  if not found then
    raise exception 'Upload % is not being processed.', p_upload_id;
  end if;

  perform private.audit(
    case when p_ok then 'upload_approved' else 'upload_rejected' end,
    v_upload.post_id, (select title from public.blog_posts where id = v_upload.post_id),
    jsonb_strip_nulls(jsonb_build_object('upload_id', p_upload_id, 'uploaded_by', v_upload.created_by,
      'filename', v_upload.original_filename, 'reason', p_reason, 'scan', p_scan_result)));
end;
$$;

-- Claims files that are safe to delete. Never touches 'attached' rows, and
-- blog_attach_upload refuses anything not 'approved', so a claimed file can't
-- come back into use.
create function public.blog_claim_cleanup()
returns table (id uuid)
language sql security definer set search_path = ''
as $$
  update public.blog_uploads u
  set status = 'deleting'
  where u.id in (
    select x.id from public.blog_uploads x
    where (x.status in ('awaiting_upload', 'processing', 'rejected') and x.created_at < now() - interval '1 day')
       or (x.status = 'approved' and x.processed_at < now() - interval '1 day')
       or (x.status = 'superseded' and x.superseded_at < now() - interval '1 day')
       or x.status = 'deleting' -- retry a previous run that failed part-way
    for update skip locked
  )
  returning u.id;
$$;

create function public.blog_mark_deleted(p_ids uuid[])
returns void
language sql security definer set search_path = ''
as $$
  update public.blog_uploads set status = 'deleted' where id = any (p_ids) and status = 'deleting';
  select private.audit('files_cleaned', null, null, jsonb_build_object('upload_ids', to_jsonb(p_ids)))
  where cardinality(p_ids) > 0;
$$;

revoke all on function
  public.blog_list_published(), public.blog_editor_status(),
  public.blog_create_post(text, text), public.blog_update_post(uuid, text, text),
  public.blog_set_published(uuid, boolean), public.blog_delete_post(uuid),
  public.blog_begin_upload(uuid, text, bigint), public.blog_claim_upload(uuid),
  public.blog_attach_upload(uuid, uuid),
  public.blog_finish_upload(uuid, boolean, text, bigint, text, int, text),
  public.blog_claim_cleanup(), public.blog_mark_deleted(uuid[])
  from public, anon, authenticated;

grant execute on function public.blog_list_published() to anon, authenticated;
grant execute on function
  public.blog_editor_status(),
  public.blog_create_post(text, text), public.blog_update_post(uuid, text, text),
  public.blog_set_published(uuid, boolean), public.blog_delete_post(uuid),
  public.blog_begin_upload(uuid, text, bigint), public.blog_claim_upload(uuid),
  public.blog_attach_upload(uuid, uuid)
  to authenticated;
grant execute on function
  public.blog_finish_upload(uuid, boolean, text, bigint, text, int, text),
  public.blog_claim_cleanup(), public.blog_mark_deleted(uuid[])
  to service_role;

-- New functions in public are executable by everyone unless revoked; make
-- that opt-in for anything added later.
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Storage
-- ---------------------------------------------------------------------------
-- Both buckets are private. Size and type are enforced by Storage itself.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('blog-uploads', 'blog-uploads', false, 20971520, array['application/pdf']),
  ('blog-files', 'blog-files', false, 20971520, array['application/pdf'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- Quarantine: editors may create (never read, overwrite or delete) the one
-- object their upload slot allows. Only the server reads it.
create policy "blog editors upload to quarantine" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'blog-uploads' and private.can_upload_blog_file(name));

-- Approved files: readable when attached to a published post, or by editors
-- (for previewing drafts). Only the server writes or deletes here.
create policy "read published blog files" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'blog-files'
         and (private.is_public_blog_file(name) or (select private.is_blog_editor())));
