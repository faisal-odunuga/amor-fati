import { createClient } from '@/lib/supabase/server';
import { calculateWeightedProgressFromCompletedWeight } from '@/lib/book-club/progress';
import type {
  AdminAnalytics,
  DailyLog,
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

export async function getCurrentProfile(role: 'member' | 'admin' = 'member'): Promise<Profile> {
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
    throw error ?? new Error('Profile not found');
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
}

export async function getActiveReadingPlan(): Promise<ReadingPlan> {
  assertSupabaseEnv();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reading_plans')
    .select('id, book_id, month_date, title, is_active')
    .eq('is_active', true)
    .order('month_date', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    throw error ?? new Error('No active plan');
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
}

export async function getCurrentBook() {
  assertSupabaseEnv();

  const plan = await getActiveReadingPlan();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .select('id, title, author, cover_url, pdf_url, description')
    .eq('id', plan.bookId)
    .single();

  if (error || !data) {
    throw error ?? new Error('Book not found');
  }

  return {
    id: data.id,
    title: data.title,
    author: data.author,
    coverUrl: data.cover_url,
    pdfUrl: data.pdf_url,
    description: data.description,
  };
}

export async function getScheduleItems(planId?: string): Promise<ScheduleItem[]> {
  assertSupabaseEnv();

  const resolvedPlanId = planId ?? (await getActiveReadingPlan()).id;
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
}

export async function getDailyLogs(profileId?: string): Promise<DailyLog[]> {
  assertSupabaseEnv();

  const profile = await getCurrentProfile();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('daily_logs')
    .select(
      'id, profile_id, schedule_item_id, plan_id, nestuge_url, reflection_summary, key_insight, action_taken, created_at'
    )
    .eq('profile_id', profileId ?? profile.id)
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
    reflectionSummary: log.reflection_summary ?? '',
    keyInsight: log.key_insight,
    actionTaken: log.action_taken,
    createdAt: log.created_at,
  }));
}

export async function getUserProgress(profileId?: string): Promise<UserProgress> {
  assertSupabaseEnv();

  const profile = await getCurrentProfile();
  const plan = await getActiveReadingPlan();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('user_progress')
    .select('id, profile_id, plan_id, completed_days, total_weight_completed, last_active_date')
    .eq('profile_id', profileId ?? profile.id)
    .eq('plan_id', plan.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return {
      id: crypto.randomUUID(),
      profileId: profileId ?? profile.id,
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
}

export async function getStreak(profileId?: string): Promise<Streak> {
  assertSupabaseEnv();

  const profile = await getCurrentProfile();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('streaks')
    .select('profile_id, current_streak, longest_streak, last_active_date')
    .eq('profile_id', profileId ?? profile.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return {
      profileId: profileId ?? profile.id,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
    };
  }

  return {
    profileId: data.profile_id,
    currentStreak: data.current_streak,
    longestStreak: data.longest_streak,
    lastActiveDate: data.last_active_date,
  };
}

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

export async function getAdminAnalytics(): Promise<AdminAnalytics> {
  assertSupabaseEnv();

  const [plan, scheduleItems, progressRows, logs] = await Promise.all([
    getActiveReadingPlan(),
    getScheduleItems(),
    getAllProgressRows(),
    getAllLogs(),
  ]);

  const totalWeight = plan.totalWeight || scheduleItems.reduce((sum, item) => sum + item.weight, 0);
  const completionRate =
    progressRows.length === 0
      ? 0
      : Math.round(
          progressRows.reduce((sum, row) => {
            return (
              sum +
              calculateWeightedProgressFromCompletedWeight(row.totalWeightCompleted, totalWeight)
            );
          }, 0) / progressRows.length
        );

  const missesByItem = scheduleItems.map((item) => {
    const count = logs.filter((log) => log.scheduleItemId === item.id).length;
    return {
      scheduleItemId: item.id,
      label: item.label,
      missCount: Math.max(progressRows.length - count, 0),
    };
  });

  return {
    completionRate,
    activeUsers: progressRows.filter((row) => row.lastActiveDate).length,
    dropOffDays: scheduleItems.slice(0, 3).map((item) => ({
      date: item.date,
      missCount: missesByItem.find((row) => row.scheduleItemId === item.id)?.missCount ?? 0,
    })),
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
      'id, profile_id, schedule_item_id, plan_id, nestuge_url, reflection_summary, key_insight, action_taken, created_at'
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
    reflectionSummary: log.reflection_summary ?? '',
    keyInsight: log.key_insight,
    actionTaken: log.action_taken,
    createdAt: log.created_at,
  }));
}
