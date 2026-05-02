import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { assertSupabaseEnv, mapBookRow } from '@/lib/book-club/query-core';
import { getActiveReadingPlan } from '@/lib/book-club/plan-queries';

export async function getAllBooks() {
  assertSupabaseEnv();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .select('id, title, author, cover_url, pdf_url, description, total_pages, total_chapters, reading_type')
    .order('created_at', { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapBookRow);
}

export const getCurrentBook = cache(async function getCurrentBook() {
  assertSupabaseEnv();

  const plan = await getActiveReadingPlan();
  if (!plan?.bookId) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .select('id, title, author, cover_url, pdf_url, description, total_pages, total_chapters, reading_type')
    .eq('id', plan.bookId)
    .single();

  if (error || !data) {
    console.error('getCurrentBook Error:', error);
    return null;
  }

  return mapBookRow(data);
});
