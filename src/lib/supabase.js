// Supabase client for the staff blog editor only (the website's own Supabase
// project, separate from the booking software). Imported lazily by
// src/pages/StaffBlog.jsx, so public pages never load it.
//
// VITE_SUPABASE_ANON_KEY is the project's public anon/publishable key. It is
// safe in the browser: every permission is enforced by the database.
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Read before the client consumes the URL hash: tells the page the visitor
// arrived from an invite or password-reset email and must choose a password.
export const authLinkType = new URLSearchParams(window.location.hash.slice(1)).get("type");

export const supabaseUrl = url;
export const supabaseKey = key;

export const supabase = url && key ? createClient(url, key) : null;
