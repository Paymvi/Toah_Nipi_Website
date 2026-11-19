// Blog posts published by staff through /staff/blog (stored in the website's
// Supabase project). Plain fetch keeps the auth library off public pages.
// The database only ever returns published posts to visitors.
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

const FALLBACK_IMAGE = "/images/campus/lake-fall-card.webp";
const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

// Returns posts shaped like the entries in src/data/stories.js.
export async function fetchPublishedPosts() {
  if (!url || !key) {
    return [];
  }

  const response = await fetch(`${url}/rest/v1/rpc/blog_list_published`, {
    method: "POST",
    headers,
    body: "{}",
  });

  if (!response.ok) {
    throw new Error(`Could not load posts (${response.status})`);
  }

  return (await response.json()).map((post) => ({
    slug: `post-${post.id}`,
    title: post.title,
    excerpt: post.description,
    date: dateFormat.format(new Date(post.published_at)),
    dateTime: post.published_at.slice(0, 10),
    category: "Blog",
    image: FALLBACK_IMAGE,
    imageAlt: "",
    pdfFile: post.pdf_file,
    pdfTitle: post.title,
  }));
}

// A short-lived link to a published post's PDF, served from Supabase's own
// domain. The database refuses to sign files of unpublished posts.
export async function getPdfUrl(pdfFile) {
  const response = await fetch(`${url}/storage/v1/object/sign/blog-files/${encodeURIComponent(pdfFile)}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ expiresIn: 600 }),
  });

  if (!response.ok) {
    throw new Error(`PDF unavailable (${response.status})`);
  }

  const { signedURL } = await response.json();
  // download= makes the "Open the story" link save the file rather than
  // render it inline (pdf.js reads the bytes either way).
  return `${url}/storage/v1${signedURL}&download=`;
}
