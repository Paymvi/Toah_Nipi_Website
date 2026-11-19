import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { authLinkType, supabase, supabaseKey, supabaseUrl } from "../lib/supabase";

// Staff blog editor at /staff/blog. This page only decides what to show;
// every permission is enforced by the database and storage policies in
// supabase/migrations (see BLOG_ADMIN_SETUP.md).

const route = { title: "Staff Blog Editor", noindex: true };
const MAX_PDF_MB = 20;
const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

function friendlyError(error) {
  const message = error?.message || String(error);

  if (/fetch|network/i.test(message)) {
    return "Couldn’t reach the server. Check your connection and try again.";
  }

  if (/JWT|token/i.test(message)) {
    return "Your session expired. Please sign out and sign in again.";
  }

  return message;
}

function checkFile(file) {
  if (!/\.pdf$/i.test(file.name) || (file.type && file.type !== "application/pdf")) {
    return "Please choose a PDF file.";
  }

  if (file.size > MAX_PDF_MB * 1024 * 1024) {
    return `PDFs must be ${MAX_PDF_MB} MB or smaller.`;
  }

  return null;
}

// supabase-js has no upload progress events, so upload with XHR.
function uploadWithProgress(path, file, token, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${supabaseUrl}/storage/v1/object/blog-uploads/${path}`);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("apikey", supabaseKey);
    xhr.setRequestHeader("Content-Type", "application/pdf");
    xhr.setRequestHeader("x-upsert", "false");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(event.loaded / event.total);
    };
    xhr.onload = () => {
      if (xhr.status < 300) resolve();
      else if (xhr.status === 413) reject(new Error(`PDFs must be ${MAX_PDF_MB} MB or smaller.`));
      else reject(new Error("The upload was refused. Please try again."));
    };
    xhr.onerror = () => reject(new Error("The upload was interrupted. Check your connection and try again."));
    xhr.send(file);
  });
}

async function accessToken() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}

// ---------------------------------------------------------------------------

export default function StaffBlog() {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [mustSetPassword, setMustSetPassword] = useState(
    authLinkType === "invite" || authLinkType === "recovery"
  );
  const [status, setStatus] = useState(null);
  const [changingPassword, setChangingPassword] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (!supabase) return undefined;

    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (event === "PASSWORD_RECOVERY") setMustSetPassword(true);
      setSession(newSession);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  // Editor membership for this session, so the page can explain "no access".
  // The database checks membership again on every request.
  useEffect(() => {
    if (!session) return undefined;

    let active = true;

    supabase.rpc("blog_editor_status").then(({ data }) => {
      if (active) setStatus({ token: session.access_token, isEditor: Boolean(data?.is_editor) });
    });

    return () => {
      active = false;
    };
  }, [session]);

  const ready = session && status?.token === session.access_token;
  let content;

  if (!supabase) {
    content = <p className="staff-note">Staff sign-in isn’t set up for this copy of the website.</p>;
  } else if (session === undefined || (session && !ready)) {
    content = <p className="staff-note" role="status">Loading…</p>;
  } else if (!session) {
    content = <SignIn linkExpired={mustSetPassword} />;
  } else if (mustSetPassword) {
    content = (
      <SetPassword
        onDone={() => {
          window.history.replaceState(null, "", window.location.pathname);
          setMustSetPassword(false);
        }}
      />
    );
  } else if (changingPassword) {
    content = (
      <SetPassword
        heading="Change password"
        onCancel={() => setChangingPassword(false)}
        onDone={() => {
          setChangingPassword(false);
          setNotice({ type: "success", text: "Your password was changed." });
        }}
      />
    );
  } else if (!status.isEditor) {
    content = (
      <p className="staff-note">
        This account doesn’t have access to manage blog posts. If you think it
        should, ask the site administrator.
      </p>
    );
  } else {
    content = <PostManager />;
  }

  return (
    <main className="staff-page">
      <SEO route={route} />

      <div className="staff-content">
        <header className="staff-header">
          <div>
            <p className="staff-eyebrow">Toah Nipi staff</p>
            <h1>Blog Editor</h1>
          </div>

          {session && (
            <div className="staff-account">
              <span>{session.user.email}</span>
              {ready && !changingPassword && (
                <button type="button" className="staff-button staff-button--quiet" onClick={() => { setNotice(null); setChangingPassword(true); }}>
                  Change password
                </button>
              )}
              <button type="button" className="staff-button staff-button--quiet" onClick={() => supabase.auth.signOut()}>
                Sign out
              </button>
            </div>
          )}
        </header>

        <Message message={notice} />
        {content}
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------

function Message({ message }) {
  if (!message) return null;

  return (
    <p className={`staff-message staff-message--${message.type}`} role={message.type === "error" ? "alert" : "status"}>
      {message.text}
    </p>
  );
}

function SignIn({ linkExpired }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(
    linkExpired
      ? { type: "error", text: "That email link has expired or was already used. Ask the site administrator for help." }
      : null
  );

  const signIn = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);

    if (error) {
      setMessage({ type: "error", text: /invalid/i.test(error.message) ? "Incorrect email or password." : friendlyError(error) });
    }
  };

  return (
    <form className="staff-card staff-narrow" onSubmit={signIn}>
      <h2>Sign in</h2>
      <Message message={message} />

      <label className="staff-field">
        <span>Email</span>
        <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label className="staff-field">
        <span>Password</span>
        <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <div className="staff-actions">
        <button type="submit" className="staff-button" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </div>

      <p className="staff-small">Forgot your password? Ask the site administrator to reset it.</p>
    </form>
  );
}

function SetPassword({ onDone, onCancel, heading = "Choose a password" }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const save = async (event) => {
    event.preventDefault();
    if (busy) return;

    if (password.length < 12) {
      setMessage({ type: "error", text: "Use at least 12 characters." });
      return;
    }

    if (password !== confirm) {
      setMessage({ type: "error", text: "The passwords don’t match." });
      return;
    }

    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);

    if (error) {
      setMessage({
        type: "error",
        text: /AAL2|MFA/i.test(error.message)
          ? "This account still has an authenticator app from the earlier setup, which blocks password changes. Ask the site administrator to remove it in Supabase, then try again."
          : /reauth|recent/i.test(error.message)
            ? "For security, sign out, sign back in, and then change your password."
            : friendlyError(error),
      });
    } else {
      onDone();
    }
  };

  return (
    <form className="staff-card staff-narrow" onSubmit={save}>
      <h2>{heading}</h2>
      <p>Use at least 12 characters. A password manager can create one for you.</p>
      <Message message={message} />

      <label className="staff-field">
        <span>New password</span>
        <input type="password" autoComplete="new-password" required minLength={12} value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <label className="staff-field">
        <span>Confirm password</span>
        <input type="password" autoComplete="new-password" required minLength={12} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </label>

      <div className="staff-actions">
        <button type="submit" className="staff-button" disabled={busy}>
          {busy ? "Saving…" : "Save password"}
        </button>
        {onCancel && (
          <button type="button" className="staff-link" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------

function PostManager() {
  const [posts, setPosts] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [version, setVersion] = useState(0);
  const [editing, setEditing] = useState(null); // null | "new" | post
  const [busyId, setBusyId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let active = true;

    supabase
      .from("blog_posts")
      .select("id, title, description, status, published_at, updated_at, pdf_upload_id, pdf:blog_uploads(original_filename)")
      .order("updated_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        setLoadError(error ? friendlyError(error) : null);
        if (data) setPosts(data);
      });

    return () => {
      active = false;
    };
  }, [version]);

  const refresh = () => setVersion((v) => v + 1);

  const run = async (post, action, successText) => {
    if (busyId) return;
    setBusyId(post.id);
    setMessage(null);
    const { error } = await action();
    setBusyId(null);
    setMessage(error ? { type: "error", text: friendlyError(error) } : { type: "success", text: successText });
    refresh();
  };

  const remove = (post) => {
    const warning = post.status === "published"
      ? `Delete “${post.title}”? It will be removed from the website. This can’t be undone.`
      : `Delete the draft “${post.title}”? This can’t be undone.`;

    if (window.confirm(warning)) {
      run(post, () => supabase.rpc("blog_delete_post", { p_id: post.id }), `Deleted “${post.title}”.`);
    }
  };

  const viewPdf = async (post) => {
    const { data, error } = await supabase.storage
      .from("blog-files")
      .createSignedUrl(`${post.pdf_upload_id}.pdf`, 300, { download: post.pdf?.original_filename || true });

    if (error) setMessage({ type: "error", text: friendlyError(error) });
    else window.location.assign(data.signedUrl);
  };

  if (editing) {
    return (
      <PostForm
        post={editing === "new" ? null : editing}
        onCancel={() => {
          setEditing(null);
          refresh();
        }}
        onDone={(text) => {
          setEditing(null);
          setMessage({ type: "success", text });
          refresh();
        }}
      />
    );
  }

  return (
    <section aria-labelledby="staff-posts-heading">
      <div className="staff-toolbar">
        <h2 id="staff-posts-heading">Posts</h2>
        <button type="button" className="staff-button" onClick={() => { setMessage(null); setEditing("new"); }}>
          New post
        </button>
      </div>

      <Message message={message} />
      {loadError && <Message message={{ type: "error", text: loadError }} />}
      {!posts && !loadError && <p className="staff-note" role="status">Loading posts…</p>}
      {posts?.length === 0 && <p className="staff-note">No posts yet. Choose “New post” to add one.</p>}

      <ul className="staff-posts">
        {posts?.map((post) => (
          <li key={post.id} className={`staff-card staff-post staff-post--${post.status}`}>
            <div className="staff-post-head">
              <span className={`staff-badge staff-badge--${post.status}`}>
                {post.status === "published" ? "Published" : "Draft"}
              </span>
              <h3>{post.title}</h3>
            </div>

            {post.description && <p className="staff-post-description">{post.description}</p>}

            <p className="staff-small">
              {post.pdf ? `PDF: ${post.pdf.original_filename}` : "No PDF yet"}
              {" · "}Updated {dateFormat.format(new Date(post.updated_at))}
              {post.status === "published" && post.published_at && ` · Published ${dateFormat.format(new Date(post.published_at))}`}
            </p>

            <div className="staff-actions">
              <button type="button" className="staff-button staff-button--quiet" disabled={busyId === post.id} onClick={() => { setMessage(null); setEditing(post); }}>
                Edit
              </button>

              {post.status === "published" ? (
                <button type="button" className="staff-button staff-button--quiet" disabled={busyId === post.id}
                  onClick={() => run(post, () => supabase.rpc("blog_set_published", { p_id: post.id, p_published: false }), `“${post.title}” is now a draft and hidden from the website.`)}>
                  Unpublish
                </button>
              ) : (
                <button type="button" className="staff-button" disabled={busyId === post.id || !post.pdf_upload_id}
                  title={post.pdf_upload_id ? undefined : "Add a PDF before publishing"}
                  onClick={() => run(post, () => supabase.rpc("blog_set_published", { p_id: post.id, p_published: true }), `“${post.title}” is now on the website.`)}>
                  Publish
                </button>
              )}

              {post.pdf_upload_id && (
                <button type="button" className="staff-button staff-button--quiet" onClick={() => viewPdf(post)}>
                  Download PDF
                </button>
              )}

              <button type="button" className="staff-button staff-button--danger" disabled={busyId === post.id} onClick={() => remove(post)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const STAGE_TEXT = {
  saving: "Saving…",
  uploading: "Uploading PDF…",
  checking: "Checking the PDF…",
  publishing: "Publishing…",
};

function PostForm({ post, onDone, onCancel }) {
  const [postId, setPostId] = useState(post?.id ?? null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [description, setDescription] = useState(post?.description ?? "");
  const [saved, setSaved] = useState({ title: post?.title, description: post?.description });
  const [file, setFile] = useState(null);
  const [fileKey, setFileKey] = useState(0);
  const [pdfName, setPdfName] = useState(post?.pdf?.original_filename ?? null);
  const [stage, setStage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const busy = stage !== null;
  const isPublished = post?.status === "published";

  const submit = async (publish) => {
    if (busy) return;
    setError(null);

    if (!title.trim()) return setError("Please enter a title.");
    if (file && checkFile(file)) return setError(checkFile(file));
    if (publish && !file && !pdfName) return setError("Add a PDF before publishing.");

    try {
      setStage("saving");
      let id = postId;

      if (!id) {
        const { data, error: createError } = await supabase.rpc("blog_create_post", { p_title: title, p_description: description });
        if (createError) throw createError;
        id = data;
        setPostId(id); // a retry after a failed upload updates this post instead of creating another
        setSaved({ title, description });
      } else if (title !== saved.title || description !== saved.description) {
        const { error: updateError } = await supabase.rpc("blog_update_post", { p_id: id, p_title: title, p_description: description });
        if (updateError) throw updateError;
        setSaved({ title, description });
      }

      if (file) {
        const { data: uploadId, error: beginError } = await supabase.rpc("blog_begin_upload", {
          p_post_id: id, p_filename: file.name, p_size: file.size,
        });
        if (beginError) throw beginError;

        setStage("uploading");
        setProgress(0);
        const token = await accessToken();
        await uploadWithProgress(`incoming/${uploadId}.pdf`, file, token, setProgress);

        // The server checks the PDF and, if it passes, makes it the post's PDF
        // in one step. The previous PDF stays live until then.
        setStage("checking");
        const response = await fetch("/api/blog-process-upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json" },
          body: JSON.stringify({ uploadId }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || "The PDF could not be checked. Please try again.");

        setPdfName(file.name);
        setFile(null);
        setFileKey((k) => k + 1);
      }

      if (publish) {
        setStage("publishing");
        const { error: publishError } = await supabase.rpc("blog_set_published", { p_id: id, p_published: true });
        if (publishError) throw publishError;
      }

      onDone(publish ? `“${title.trim()}” is now on the website.` : `Saved “${title.trim()}”.`);
    } catch (caught) {
      setError(friendlyError(caught));
    } finally {
      setStage(null);
    }
  };

  return (
    <form className="staff-card staff-form" onSubmit={(event) => { event.preventDefault(); submit(false); }}>
      <div className="staff-post-head">
        {postId && (
          <span className={`staff-badge staff-badge--${isPublished ? "published" : "draft"}`}>
            {isPublished ? "Published" : "Draft"}
          </span>
        )}
        <h2>{post ? "Edit post" : postId ? "New post (saved as draft)" : "New post"}</h2>
      </div>

      {isPublished && (
        <p className="staff-small">Changes you save here appear on the website right away.</p>
      )}

      <label className="staff-field">
        <span>Title</span>
        <input required maxLength={150} value={title} disabled={busy} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <label className="staff-field">
        <span>Short description <em>(optional, {500 - description.length} characters left)</em></span>
        <textarea rows={3} maxLength={500} value={description} disabled={busy} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <label className="staff-field">
        <span>{pdfName ? "Replace PDF" : "PDF"} <em>(up to {MAX_PDF_MB} MB)</em></span>
        {pdfName && <span className="staff-small">Current file: {pdfName}</span>}
        <input
          key={fileKey}
          type="file"
          accept="application/pdf,.pdf"
          disabled={busy}
          onChange={(e) => {
            const chosen = e.target.files?.[0] ?? null;
            setFile(chosen);
            setError(chosen && checkFile(chosen));
          }}
        />
      </label>

      {pdfName && file && (
        <p className="staff-small">The current PDF stays on the website until the new one has uploaded and passed its checks.</p>
      )}

      {busy && (
        <div className="staff-progress" role="status">
          <span>{STAGE_TEXT[stage]}</span>
          {stage === "uploading" && <progress max="1" value={progress} aria-label="Upload progress" />}
        </div>
      )}

      {error && <Message message={{ type: "error", text: error }} />}

      <div className="staff-actions">
        <button type="submit" className={isPublished ? "staff-button" : "staff-button staff-button--quiet"} disabled={busy}>
          {isPublished ? "Save changes" : "Save draft"}
        </button>
        {!isPublished && (
          <button type="button" className="staff-button" disabled={busy} onClick={() => submit(true)}>
            Save and publish
          </button>
        )}
        <button type="button" className="staff-link" disabled={busy} onClick={onCancel}>
          {postId && !post ? "Back to posts" : "Cancel"}
        </button>
      </div>
    </form>
  );
}
