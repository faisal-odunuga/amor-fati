import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import type { Book, DailyLog, Profile, ResourceAsset, ScheduleItem } from '@/lib/book-club/types';

export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

export function assertSupabaseEnv() {
  if (!hasSupabaseEnv()) {
    throw new Error('Supabase environment variables are missing.');
  }
}

export const getCurrentProfile = cache(async function getCurrentProfile(
  role: 'member' | 'admin' = 'member'
): Promise<Profile> {
  assertSupabaseEnv();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, role, subscription_status, created_at')
    .eq('id', user.id)
    .single();

  if (error || !data) {
    console.error('getCurrentProfile Error:', error);
    throw new Error(`Profile lookup failed: ${error?.message || 'Not found'}`);
  }

  if (role === 'admin' && data.role !== 'admin') {
    throw new Error('Forbidden');
  }

  if (role === 'member' && data.role !== 'member' && data.role !== 'admin') {
    throw new Error('Forbidden');
  }

  return {
    id: data.id,
    email: data.email,
    fullName: data.full_name ?? data.email,
    role: data.role,
    subscriptionStatus: data.subscription_status,
    createdAt: data.created_at,
  };
});

export function getTodayIsoDate() {
  return new Date().toISOString().split('T')[0];
}

export function mapBookRow(book: {
  id: string;
  title: string;
  author: string | null;
  cover_url: string | null;
  pdf_url: string | null;
  description: string | null;
  total_pages: number | null;
  total_chapters: number | null;
  reading_type: 'chapter' | 'pages' | null;
}): Book {
  return {
    id: book.id,
    title: book.title,
    author: book.author ?? '',
    coverUrl: book.cover_url,
    pdfUrl: book.pdf_url,
    description: book.description ?? '',
    totalPages: book.total_pages,
    totalChapters: book.total_chapters,
    readingType: book.reading_type,
  };
}

export function mapScheduleItemRow(item: {
  id: string;
  plan_id: string;
  date: string;
  day_index: number;
  label: string;
  description: string;
  type: ScheduleItem['type'];
  weight: number | string;
  created_at: string;
}): ScheduleItem {
  return {
    id: item.id,
    planId: item.plan_id,
    date: item.date,
    dayIndex: item.day_index,
    label: item.label,
    description: item.description,
    type: item.type,
    weight: Number(item.weight),
    createdAt: item.created_at,
  };
}

export function mapDailyLogRow(log: {
  id: string;
  profile_id: string;
  schedule_item_id: string;
  plan_id: string;
  nestuge_url: string;
  log_date: string;
  desc: string | null;
  created_at: string;
}): DailyLog {
  return {
    id: log.id,
    profileId: log.profile_id,
    scheduleItemId: log.schedule_item_id,
    planId: log.plan_id,
    nestugeUrl: log.nestuge_url,
    logDate: log.log_date,
    desc: log.desc ?? undefined,
    createdAt: log.created_at,
  };
}

export function mapResourceRow(item: {
  id: string;
  title: string;
  description: string | null;
  file_path: string;
  mime_type: string;
  is_members_only: boolean;
  created_at: string;
}): ResourceAsset {
  return {
    id: item.id,
    title: item.title,
    description: item.description ?? '',
    filePath: item.file_path,
    mimeType: item.mime_type,
    isMembersOnly: item.is_members_only,
    createdAt: item.created_at,
  };
}
