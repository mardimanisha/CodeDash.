import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseClient() {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseClient should only be called on the client.");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return createBrowserClient(supabaseUrl, supabaseKey);
}
