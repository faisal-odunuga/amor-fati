import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { calculateWeightedProgressFromCompletedWeight } from '@/lib/book-club/progress';
import type {
  AdminAnalytics,
  DailyLog,
  DailyLogWithProfile,
  LeaderboardEntry,
  Profile,
  ReadingPlan,
  ResourceAsset,
  ScheduleItem,
  Streak,
  Testimonial,
  UserProgress,
} from '@/lib/book-club/types';

export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

function assertSupabaseEnv() {
  if (!hasSupabaseEnv()) {
    throw new Error('Supabase environment variables are missing.');
  }
}

export const getCurrentProfile = cache(async function getCurrentProfile(role: 'member' | 'admin' = 'member'): Promise<Profile> {
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

export const getActiveReadingPlan = cache(async function getActiveReadingPlan(): Promise<ReadingPlan | null> {
  assertSupabaseEnv();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reading_plans')
    .select('id, book_id, month_date, title, is_active')
    .eq('is_active', true)
    .order('month_date', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('getActiveReadingPlan Error:', error);
    throw new Error(`Active plan lookup failed: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  const scheduleItems = await getScheduleItems(data.id);

  return {
    id: data.id,
    bookId: data.book_id,
    monthDate: data.month_date,
    title: data.title,
    isActive: data.is_active,
    totalWeight: scheduleItems.reduce((sum, item) => sum + item.weight, 0),
  };
});

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

  return data.map(book => ({
    id: book.id,
    title: book.title,
    author: book.author,
    coverUrl: book.cover_url,
    pdfUrl: book.pdf_url,
    description: book.description,
    totalPages: book.total_pages,
    totalChapters: book.total_chapters,
    readingType: book.reading_type,
  }));
}

export const getCurrentBook = cache(async function getCurrentBook() {
  assertSupabaseEnv();

  const plan = await getActiveReadingPlan();
  if (!plan) return null;

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

  return {
    id: data.id,
    title: data.title,
    author: data.author,
    coverUrl: data.cover_url,
    pdfUrl: data.pdf_url,
    description: data.description,
    totalPages: data.total_pages,
    totalChapters: data.total_chapters,
    readingType: data.reading_type,
  };
});

export const getScheduleItems = cache(async function getScheduleItems(planId?: string): Promise<ScheduleItem[]> {
  assertSupabaseEnv();

  const resolvedPlanId = planId ?? (await getActiveReadingPlan())?.id;
  if (!resolvedPlanId) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('schedule_items')
    .select('id, plan_id, date, day_index, label, description, type, weight, created_at')
    .eq('plan_id', resolvedPlanId)
    .order('date', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    planId: item.plan_id,
    date: item.date,
    dayIndex: item.day_index,
    label: item.label,
    description: item.description,
    type: item.type,
    weight: Number(item.weight),
    createdAt: item.created_at,
  }));
});

export const getDailyLogs = cache(async function getDailyLogs(profileId?: string): Promise<DailyLog[]> {
  assertSupabaseEnv();

  const resolvedId = profileId ?? (await getCurrentProfile()).id;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('daily_logs')
    .select(
      'id, profile_id, schedule_item_id, plan_id, nestuge_url, log_date, desc, created_at'
    )
    .eq('profile_id', resolvedId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((log) => ({
    id: log.id,
    profileId: log.profile_id,
    scheduleItemId: log.schedule_item_id,
    planId: log.plan_id,
    nestugeUrl: log.nestuge_url,
    logDate: log.log_date,
    desc: log.desc,
    createdAt: log.created_at,
  }));
});

export const getUserProgress = cache(async function getUserProgress(profileId?: string): Promise<UserProgress> {
  assertSupabaseEnv();

  const resolvedId = profileId ?? (await getCurrentProfile()).id;
  const plan = await getActiveReadingPlan();
  if (!plan) {
    return {
      id: crypto.randomUUID(),
      profileId: resolvedId,
      planId: '',
      completedDays: 0,
      totalWeightCompleted: 0,
      lastActiveDate: null,
    };
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('user_progress')
    .select('id, profile_id, plan_id, completed_days, total_weight_completed, last_active_date')
    .eq('profile_id', resolvedId)
    .eq('plan_id', plan.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return {
      id: crypto.randomUUID(),
      profileId: resolvedId,
      planId: plan.id,
      completedDays: 0,
      totalWeightCompleted: 0,
      lastActiveDate: null,
    };
  }

  return {
    id: data.id,
    profileId: data.profile_id,
    planId: data.plan_id,
    completedDays: data.completed_days,
    totalWeightCompleted: Number(data.total_weight_completed),
    lastActiveDate: data.last_active_date,
  };
});

export const getStreak = cache(async function getStreak(profileId?: string): Promise<Streak> {
  assertSupabaseEnv();

  const resolvedId = profileId ?? (await getCurrentProfile()).id;
  const supabase = await createClient();
  const { data, error } = await supabase
    .rpc('calculate_user_streak', { p_profile_id: resolvedId })
    .maybeSingle();

  if (error) {
    console.error('Error fetching streak from RPC:', error);
    return {
      profileId: resolvedId,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
    };
  }

  const streakData = data as {
    current_streak: number;
    longest_streak: number;
    last_active_date: string | null;
  } | null;

  if (!streakData) {
    return {
      profileId: resolvedId,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
    };
  }

  return {
    profileId: resolvedId,
    currentStreak: streakData.current_streak ?? 0,
    longestStreak: streakData.longest_streak ?? 0,
    lastActiveDate: streakData.last_active_date ?? null,
  };
});

export async function getTestimonials(): Promise<Testimonial[]> {
  assertSupabaseEnv();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('id, profile_id, plan_id, generated_text, status, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    profileId: item.profile_id,
    planId: item.plan_id,
    generatedText: item.generated_text,
    status: item.status,
    createdAt: item.created_at,
  }));
}

export async function getResources(): Promise<ResourceAsset[]> {
  assertSupabaseEnv();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('resources')
    .select('id, title, description, file_path, mime_type, is_members_only, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description ?? '',
    filePath: item.file_path,
    mimeType: item.mime_type,
    isMembersOnly: item.is_members_only,
    createdAt: item.created_at,
  }));
}

/**
 * Internal helper to calculate weighted completion percentage.
 */
function calculateCompletionRate(progressRows: UserProgress[], totalWeight: number): number {
  if (progressRows.length === 0 || totalWeight === 0) return 0;

  const totalPossibleWeight = progressRows.length * totalWeight;
  const totalCompletedWeight = progressRows.reduce((sum, row) => sum + row.totalWeightCompleted, 0);

  return Math.round((totalCompletedWeight / totalPossibleWeight) * 100);
}

/**
 * Internal helper to map schedule items to miss counts.
 */
function calculateMissesByItem(scheduleItems: ScheduleItem[], logs: DailyLog[], memberCount: number) {
  return scheduleItems.map((item) => {
    const proofCount = logs.filter((log) => log.scheduleItemId === item.id).length;
    return {
      scheduleItemId: item.id,
      label: item.label,
      date: item.date,
      missCount: Math.max(memberCount - proofCount, 0),
    };
  });
}

export async function getAdminAnalytics(): Promise<AdminAnalytics> {
  assertSupabaseEnv();

  const [plan, scheduleItems, progressRows, logs] = await Promise.all([
    getActiveReadingPlan(),
    getScheduleItems(),
    getAllProgressRows(),
    getAllLogs(),
  ]);

  if (!plan) {
    return {
      completionRate: 0,
      activeUsers: progressRows.length,
      dropOffDays: [],
      mostSkippedItems: [],
    };
  }

  const totalWeight = plan.totalWeight || scheduleItems.reduce((sum, item) => sum + item.weight, 0);
  const memberCount = progressRows.length;
  
  const missesByItem = calculateMissesByItem(scheduleItems, logs, memberCount);

  return {
    completionRate: calculateCompletionRate(progressRows, totalWeight),
    activeUsers: progressRows.filter((row) => row.lastActiveDate).length,
    dropOffDays: missesByItem.slice(0, 3).map(m => ({ date: m.date, missCount: m.missCount })),
    mostSkippedItems: missesByItem.sort((a, b) => b.missCount - a.missCount).slice(0, 3),
  };
}

async function getAllProgressRows(): Promise<UserProgress[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('user_progress')
    .select('id, profile_id, plan_id, completed_days, total_weight_completed, last_active_date');

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    profileId: row.profile_id,
    planId: row.plan_id,
    completedDays: row.completed_days,
    totalWeightCompleted: Number(row.total_weight_completed),
    lastActiveDate: row.last_active_date,
  }));
}

async function getAllLogs(): Promise<DailyLog[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('daily_logs')
    .select(
      'id, profile_id, schedule_item_id, plan_id, nestuge_url, log_date, desc, created_at'
    );

  if (error) {
    throw error;
  }

  return (data ?? []).map((log) => ({
    id: log.id,
    profileId: log.profile_id,
    scheduleItemId: log.schedule_item_id,
    planId: log.plan_id,
    nestugeUrl: log.nestuge_url,
    logDate: log.log_date,
    desc: log.desc,
    createdAt: log.created_at,
  }));
}

export const getLeaderboard = cache(async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  assertSupabaseEnv();
  const supabase = await createClient();
  
  // We expect either a 'leaderboard' view or an RPC. Let's use RPC.
  const { data, error } = await supabase.rpc('get_leaderboard');
  
  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
  
  return (data ?? []).map((row: any) => ({
    profileId: row.profile_id,
    fullName: row.full_name,
    score: row.score ?? (Number(row.total_weight) * 100),
    currentStreak: row.current_streak ?? 0,
    completedWeight: Number(row.total_weight ?? 0),
  }));
});

export const getMissedDays = cache(async function getMissedDays(profileId?: string): Promise<ScheduleItem[]> {
  const [scheduleItems, logs] = await Promise.all([
    getScheduleItems(),
    getDailyLogs(profileId),
  ]);

  const today = new Date().toISOString().split('T')[0];
  const loggedItemIds = new Set(logs.map(log => log.scheduleItemId));

  return scheduleItems.filter((item) => {
    // Only count as missed if the date is in the past or today, and not logged
    return item.date <= today && !loggedItemIds.has(item.id);
  });
});

export async function getAllProfiles(): Promise<Profile[]> {
  assertSupabaseEnv();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'member')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map((p) => ({
    id: p.id,
    email: p.email,
    fullName: p.full_name,
    role: p.role,
    subscriptionStatus: p.subscription_status,
    createdAt: p.created_at,
  }));
}

export async function getProfileById(id: string): Promise<Profile> {
  assertSupabaseEnv();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) throw error ?? new Error('Profile not found');

  return {
    id: data.id,
    email: data.email,
    fullName: data.full_name,
    role: data.role,
    subscriptionStatus: data.subscription_status,
    createdAt: data.created_at,
  };
}

export async function getAllLogsWithProfiles(limit: number = 50, offset: number = 0): Promise<DailyLogWithProfile[]> {
  assertSupabaseEnv();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('daily_logs')
    .select(`
      *,
      profiles(full_name, email),
      schedule_items(label, date)
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  return (data ?? []).map((log: any) => ({
    id: log.id,
    profileId: log.profile_id,
    scheduleItemId: log.schedule_item_id,
    planId: log.plan_id,
    nestugeUrl: log.nestuge_url,
    logDate: log.log_date,
    desc: log.desc,
    createdAt: log.created_at,
    profile: {
      fullName: log.profiles.full_name,
      email: log.profiles.email,
    },
    scheduleItem: {
      label: log.schedule_items.label,
      date: log.schedule_items.date,
    },
  }));
}

export async function getTodaysLogs(): Promise<DailyLogWithProfile[]> {
  assertSupabaseEnv();
  const supabase = await createClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('daily_logs')
    .select(`
      *,
      profiles(full_name, email),
      schedule_items(label, date)
    `)
    .gte('created_at', todayStart.toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map((log: any) => ({
    id: log.id,
    profileId: log.profile_id,
    scheduleItemId: log.schedule_item_id,
    planId: log.plan_id,
    nestugeUrl: log.nestuge_url,
    logDate: log.log_date,
    desc: log.desc,
    createdAt: log.created_at,
    profile: {
      fullName: log.profiles.full_name,
      email: log.profiles.email,
    },
    scheduleItem: {
      label: log.schedule_items.label,
      date: log.schedule_items.date,
    },
  }));
}
export async function getLogById(id: string): Promise<DailyLogWithProfile> {
  assertSupabaseEnv();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('daily_logs')
    .select(`
      *,
      profiles(full_name, email),
      schedule_items(label, date)
    `)
    .eq('id', id)
    .single();

  if (error || !data) throw error ?? new Error('Log not found');

  return {
    id: data.id,
    profileId: data.profile_id,
    scheduleItemId: data.schedule_item_id,
    planId: data.plan_id,
    nestugeUrl: data.nestuge_url,
    logDate: data.log_date,
    desc: data.desc,
    createdAt: data.created_at,
    profile: {
      fullName: data.profiles.full_name,
      email: data.profiles.email,
    },
    scheduleItem: {
      label: data.schedule_items.label,
      date: data.schedule_items.date,
    },
  };
}
