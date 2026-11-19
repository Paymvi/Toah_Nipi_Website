# Staff blog editor: setup and use

Authorized staff can publish PDF blog posts on the **New!** page (`/new`) without editing code: sign in, enter the post details, choose a PDF, and click **Save and publish**.

> **Status:** the code, database migration and tests are complete and pass against a local Supabase stack and in a headless Chrome browser. Before using it on the live site, apply the new migration to the hosted project and check the Vercel settings. See [Setup checklist](#setup-checklist).

Contents: [For staff](#for-staff) · [Security model](#security-model) · [PDF checks](#pdf-checks-not-antivirus) · [File lifecycle](#publication-and-file-lifecycle) · [Setup checklist](#setup-checklist) · [Managing editors](#managing-editors) · [Environment variables](#environment-variables) · [Testing](#testing) · [Known limitations](#known-limitations)

---

## For staff

**Where to sign in:** go to **toahnipi.org/staff/blog**, or use the small **Staff** link at the bottom of any page. Sign in with your email and password.

**First time:** sign in with the email and temporary password the site administrator gave you, then choose **Change password** (top right) and pick your own password of at least 12 characters. If you forget your password, ask the site administrator to reset it.

| To… | Do this |
| --- | --- |
| Publish a post | **New post** → title, optional short description, choose the PDF → **Save and publish**. |
| Save a draft | Same, but **Save draft**. Drafts are private. |
| Publish / hide later | **Publish** or **Unpublish** on the post. |
| Edit the title or description | **Edit** → change → **Save**. Changes to a published post appear right away. |
| Replace the PDF | **Edit** → choose a new PDF → **Save**. The current PDF stays on the website until the new one has uploaded and passed its checks. |
| Check a PDF | **Download PDF** on the post. |
| Delete | **Delete**, then confirm. This can't be undone. |

If a PDF isn't accepted, a message says why, for example "This PDF contains JavaScript". Export it again as a standard PDF and try again; your typed title and description are kept. Exports from Canva, Word or Google Docs normally pass. Drafts have a dashed border and a **Draft** badge; published posts have a green **Published** badge.

---

## Security model

**Separate project.** The blog has its own Supabase project for sign-in, database and file storage. It shares nothing with the booking software, so a blog account can't reach booking, guest or signature data.

**Signing in grants nothing.** Sign-in is email and password, with public sign-up turned off. A signed-in user can manage posts only if their user id is in `private.blog_editors`. The database checks this on **every** request: every post change, every upload slot, every storage write, and the upload check. The `private` schema isn't exposed through the API, so no one can add themselves; only the project owner can, in the SQL editor. Removing someone from the list takes effect on their next request.

| Protection | Where it runs |
| --- | --- |
| Deny by default: clients have no write grants on any table; editors get read-only access through RLS | Postgres |
| Every change goes through a function that checks editor membership, validates fields, and writes the audit log | Postgres (`blog_create_post`, `blog_update_post`, `blog_set_published`, `blog_delete_post`, `blog_begin_upload`) |
| Visitors can only call `blog_list_published()`, which returns published posts only | Postgres |
| An editor reserves an upload slot and may write exactly one object, `incoming/<server-generated id>.pdf`, within an hour, into a private quarantine bucket. They can't read, overwrite or delete it | Storage policies |
| Bucket limits: 20 MB, `application/pdf` only, both buckets private | Storage |
| The upload check runs only for the editor who owns the slot (verified by the database using their session), once per upload | Vercel function [api/blog-process-upload.js](api/blog-process-upload.js) → `blog_claim_upload` |
| Only that function (with the server-only secret key) can write to the published-files bucket or attach a PDF to a post. Editors can't skip the check by calling the database or Storage directly | Storage policies + function grants |
| A PDF that passes is attached in the same transaction that records the result; the previous PDF stays live until then | Postgres (`blog_finish_upload`) |
| Rate limits: 30 upload slots per editor per hour, 100 changes per editor per 10 minutes, plus Supabase Auth's sign-in limits | Postgres + Supabase Auth |
| Audit log: who created, edited, published, unpublished or deleted, plus each PDF check result and PDF swap (recorded as the server, with who uploaded the file). Editors can read it but can't write or delete it | Postgres |
| Titles and descriptions are plain text, checked in the database and rendered as text by React | Postgres + React |
| `/staff/*` is served with `noindex`, `no-store`, `X-Frame-Options: DENY` and a strict Content-Security-Policy | [vercel.json](vercel.json) |

**Sessions.** Supabase Auth issues short-lived tokens (1 hour) that refresh automatically. supabase-js sends them in an `Authorization` header, not a cookie, so cross-site request forgery doesn't apply.

**Keys.** The browser uses only the public anon/publishable key. `SUPABASE_SERVICE_ROLE_KEY` is read only by the Vercel function. It isn't in the browser bundle (a build check confirmed this) and is never logged or returned.

---

## PDF checks (not antivirus)

Every upload is checked on the server before it can appear. A file is refused if:

- its name doesn't end in `.pdf`, its declared type isn't `application/pdf`, it's empty, or it's over 20 MB (the storage bucket also enforces 20 MB);
- it doesn't start with a PDF header or end with `%%EOF` (for example, an HTML file renamed to `.pdf`, or a truncated file);
- it contains JavaScript, launch actions, embedded or attached files, XFA forms, forms that submit or import data, links to other files, rich media, or encryption. These are looked for in the raw file, including escaped names and compressed object streams, and again by pdf.js (Mozilla's PDF library) when it parses the file;
- pdf.js can't parse it, it has more than 300 pages, it's password-protected or encrypted, it's a PDF portfolio, or it has links that aren't web or email addresses.

**This is validation, not antivirus scanning.** It blocks common kinds of active content and malformed files. It does **not** detect malware in general, and a file that passes may still be harmful. You've accepted that risk because only trusted editors can upload. Files that pass are recorded with `scan_result = 'not_scanned'`.

---

## Publication and file lifecycle

```
editor chooses a PDF and saves
  └─ blog_begin_upload → "awaiting_upload" (id chosen by the database)
      └─ browser uploads to private bucket  blog-uploads/incoming/<id>.pdf   (quarantine)
          └─ /api/blog-process-upload (editor's session) → "processing"
              ├─ fails checks → "rejected" (reason shown), quarantine copy deleted, post unchanged
              └─ passes → copied to private bucket  blog-files/<id>.pdf
                   └─ blog_finish_upload (one transaction): "attached" to the post, previous PDF "superseded"
editor clicks Publish (or "Save and publish" did it already)
```

- **Who can read `blog-files`:** anyone, but only for the current PDF of a **published** post. Editors can also read it, to preview drafts. Quarantined, rejected and replaced files are never public.
- **How visitors get the PDF:** `/new` asks Supabase for a signed link valid for **10 minutes**, served from Supabase's own storage domain (`<ref>.supabase.co`), not toahnipi.org. The database refuses to sign links for unpublished posts.
- **Unpublishing or deleting** blocks new links immediately. Links issued in the previous 10 minutes keep working until they expire, and downloaded copies can't be recalled.
- **Cleanup** runs after each upload. It deletes files that have been rejected, abandoned, replaced, or that belong to deleted posts, once they are more than a day old. It never touches a post's current PDF.

---

## Setup checklist

Already done: the website Supabase project exists, the original migration (`20261119000000_blog_admin.sql`) is applied, `private` isn't exposed through the API, and your editor account exists.

1. **Apply [`supabase/migrations/20261121000000_simple_publish.sql`](supabase/migrations/20261121000000_simple_publish.sql)** in the hosted SQL Editor, after checking that the dashboard shows the website project. It works whether or not the earlier local-approval migration was applied, and it doesn't change posts, published PDFs, accounts or editor access.
   - Supabase will warn about "destructive operations". That's expected: it only drops and re-adds two value-list constraints, and removes functions of the earlier approval designs with `drop function if exists`. Uploads that were still waiting for approval, if any, are withdrawn; re-upload those PDFs. Choose **Run this query**.
2. **Vercel environment variables** (Project Settings → Environment Variables; values are never shown here):
   - `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must be set (they already are).
   - `SUPABASE_SERVICE_ROLE_KEY` must be set **as a server variable** (not `VITE_`), holding a **current** secret key from the website project. If you deleted the key it held, create a new one under **Project Settings → API Keys → Secret keys** and paste it into this variable in Vercel yourself.
   - Other entries such as `CRON_SECRET` and `MALWARE_SCAN_*` are no longer used. They can stay or be removed; the code ignores them.
3. **Remove your old authenticator** (only if you set one up earlier): **Authentication → Users →** your user → remove the MFA factor. Sign-in already works without it, but Supabase blocks password changes for accounts that still have one.
4. **Optional:** if you used the earlier local approver, delete the `local-approver` secret key in Supabase and the folder `%LOCALAPPDATA%\ToahNipiBlogApprover` on your computer. Docker isn't needed for anything.
5. **Test on a Vercel preview** before production: sign in, publish a post with a PDF, check `/new` in a private window, unpublish, and check it disappears.

---

## Managing editors

**Add an editor** (project owner, no email needed):

1. **Authentication → Users → Add user → Create new user**: their email, a strong temporary password, **Auto Confirm User** ticked. Give them the password in person or by phone.
2. Grant access in the **SQL Editor**:

   ```sql
   insert into private.blog_editors (user_id, note)
   select id, 'Jane Doe, communications' from auth.users where email = 'jane@example.org';
   ```

**Reset a forgotten password** (SQL Editor). Give them the temporary password in person; they then choose **Change password**:

```sql
update auth.users
set encrypted_password = extensions.crypt('A-New-Temporary-Password-2026', extensions.gen_salt('bf'))
where email = 'jane@example.org';
```

**Remove an editor** (takes effect on their next request):

```sql
delete from private.blog_editors
where user_id = (select id from auth.users where email = 'jane@example.org');
```

To also stop them signing in at all: **Authentication → Users →** the user **→ Delete user**. The audit log keeps their email on past entries.

**Who is an editor?**

```sql
select u.email, e.note, e.added_at from private.blog_editors e join auth.users u on u.id = e.user_id;
```

**Audit log:**

```sql
select at, coalesce(actor_email, 'server') as who, action, post_title, details
from public.blog_audit_log order by at desc limit 100;
```

---

## Environment variables

| Name | Where | Secret? | Used by |
| --- | --- | --- | --- |
| `VITE_SUPABASE_URL` | Vercel, `.env.local` | No | Browser and the upload function |
| `VITE_SUPABASE_ANON_KEY` | Vercel, `.env.local` | No (public by design) | Browser and the upload function |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel (server), `.env.local` for local testing | **Yes** | Only [api/blog-process-upload.js](api/blog-process-upload.js) |

[`.env.example`](.env.example) lists the names with placeholders. `.env.local` is git-ignored. If the `VITE_` variables are missing, the site still builds and `/new` shows only the built-in stories.

---

## Testing

| Command | What it checks | Needs |
| --- | --- | --- |
| `npm test` | PDF checks: valid PDFs (including the site's two existing ones) pass; wrong extension or type, empty, oversized, HTML disguised as PDF, damaged, JavaScript (plain, escaped, hidden in compressed streams), launch actions, `file:` links, attachments and encrypted PDFs are rejected | Nothing |
| `npm run test:blog-security` | 17 groups of direct API requests through the real upload function: anonymous users and signed-in non-editors can't manage posts or upload; editors work with password-only sessions, including accounts with an old authenticator; no self-granting, direct writes or audit forgery; field validation; upload → check → publish → public reading; drafts and unchecked uploads stay private; write-once quarantine, path traversal, someone else's slot, wrong type, oversized; invalid, disguised, damaged, encrypted, attachment and JavaScript PDFs rejected while the published PDF stays; changed IDs and repeated calls refused; replacement swaps in one step; unpublish and delete block new links; cleanup keeps current PDFs; audit entries; removing an editor revokes access; rate limit | Docker and `npx supabase start` (local stack on ports 56421–56429, project `toah_nipi_blog`). Uses only the local stack's demo keys and refuses to run against anything but localhost. |
| `npm run build` | Image paths, production build, SEO checks, lint | Note that `vite build` reads `.env*` files in the project folder |

---

## Known limitations

- **No antivirus scanning** (accepted): see [PDF checks](#pdf-checks-not-antivirus).
- **Password-only sign-in.** Use strong, unique passwords, and remove editors who no longer need access.
- **Revocation of links:** links issued in the 10 minutes before unpublishing keep working until they expire, and downloaded copies can't be recalled.
- **PDF response headers.** Supabase Storage sends `Content-Type: application/pdf`, and the visitor's **Open the story** link downloads the file (`Content-Disposition: attachment`). Storage doesn't send `X-Content-Type-Options: nosniff`, and this can't be configured.
- **Session tokens live in browser storage** (the supabase-js default). The site renders no user HTML, and `/staff/blog` has a strict CSP.
- **Staff posts don't get their own page** (`/new/<slug>`) or link previews.
- **Concurrent edits:** the last save wins; both saves are in the audit log.
- **Local dev server only:** pdf.js can't render PDFs under `npm run dev` ("Invalid workerSrc type"). This predates the blog editor and also affects the built-in stories; production builds render correctly.
