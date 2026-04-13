import { createClient } from "@supabase/supabase-js";

// Blog uses its own Supabase project (separate from the main Landing app).
// Credentials come from VITE_BLOG_SUPABASE_URL / VITE_BLOG_SUPABASE_ANON_KEY
// defined in .env.local — see config.example below.
const url  = import.meta.env.VITE_BLOG_SUPABASE_URL  as string;
const key  = import.meta.env.VITE_BLOG_SUPABASE_ANON_KEY as string;

export const blogSupabase = createClient(url, key);
