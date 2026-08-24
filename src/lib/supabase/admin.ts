import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * SERVER-ONLY admin client using the service-role key.
 * Bypasses RLS — never import from a Client Component.
 * Returns null when env vars are absent so callers can degrade gracefully.
 */
export function createAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  return createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
