import { createClient } from '@/lib/supabase/server';
import { assertSupabaseEnv, mapResourceRow } from '@/lib/book-club/query-core';

export async function getResources() {
  assertSupabaseEnv();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('resources')
    .select('id, title, description, file_path, mime_type, is_members_only, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapResourceRow);
}
