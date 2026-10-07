// Loads the Supabase client on first use so it stays out of the initial page bundle.
// (client.ts is auto-generated; import it only through here from always-loaded code.)
export const getSupabase = () => import('./client').then((m) => m.supabase);
