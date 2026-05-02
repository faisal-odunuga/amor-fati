import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { assertSupabaseEnv, mapDailyLogRow } from '@/lib/book-club/query-core';
import { getActiveReadingPlan, getScheduleItems } from '@/lib/book-club/plan-queries';
import type {
  AdminAnalytics,
  DailyLog,
  DailyLogWithProfile,
  LeaderboardEntry,
  Profile,
  ScheduleItem,
  Testimonial,
  UserProgress,
} from '@/lib/book-club/types';

type LeaderboardRpcRow = {
  profile_id: string;
  full_name: string;
  score: number | null;
  current_streak: number | null;
  completed_weight?: number | null;
  total_weight?: number | null;
};

type JoinedLogRow = {
  id: string;
  profile_id: string;
  schedule_item_id: string;
  plan_id: string;
  nestuge_url: string;
  log_date: string;
  desc: string | null;
  created_at: string;
  profiles: Array<{
    full_name: string | null;
    email: string;
  }> | null;
  schedule_items: Array<{
    label: string;
    date: string;
  }> | null;
};

function calculateCompletionRate(progressRows: UserProgress[], totalWeight: number): number {
  if (progressRows.length === 0 || totalWeight === 0) return 0;

  const totalPossibleWeight = progressRows.length * totalWeight;
  const totalCompletedWeight = progressRows.reduce((sum, row) => sum + row.totalWeightCompleted, 0);

  return Math.round((totalCompletedWeight / totalPossibleWeight) * 100);
}

function calculateMissesByItem(scheduleItems: ScheduleItem[], logs: DailyLog[], memberCount: number) {
  const proofCountByItemId = new Map<string, number>();

  for (const log of logs) {
    proofCountByItemId.set(log.scheduleItemId, (proofCountByItemId.get(log.scheduleItemId) ?? 0) + 1);
  }

  return scheduleItems.map((item) => {
    const proofCount = proofCountByItemId.get(item.id) ?? 0;
    return {
      scheduleItemId: item.id,
      label: item.label,
      date: item.date,
      missCount: Math.max(memberCount - proofCount, 0),
    };
  });
}

function mapProfileRow(profile: {
  id: string;
  email: string;
  full_name: string | null;
  role: Profile['role'];
  subscription_status: Profile['subscriptionStatus'];
  created_at: string;
}): Profile {
  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name ?? profile.email,
    role: profile.role,
    subscriptionStatus: profile.subscription_status,
    createdAt: profile.created_at,
  };
}

function mapJoinedLogRow(log: JoinedLogRow): DailyLogWithProfile {
  const base = mapDailyLogRow(log);
  const profile = log.profiles?.[0];
  const scheduleItem = log.schedule_items?.[0];

  return {
    ...base,
    profile: {
      fullName: profile?.full_name ?? profile?.email ?? 'Unknown Member',
      email: profile?.email ?? '',
    },
    scheduleItem: scheduleItem
      ? {
          label: scheduleItem.label,
          date: scheduleItem.date,
        }
      : undefined,
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
    .select('id, profile_id, schedule_item_id, plan_id, nestuge_url, log_date, desc, created_at');

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapDailyLogRow);
}

async function getJoinedLogs(query: PromiseLike<{ data: unknown[] | null; error: unknown | null }>) {
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map((log) => mapJoinedLogRow(log as JoinedLogRow));
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
    dropOffDays: missesByItem.slice(0, 3).map((item) => ({ date: item.date, missCount: item.missCount })),
    mostSkippedItems: missesByItem.sort((a, b) => b.missCount - a.missCount).slice(0, 3),
  };
}

export const getLeaderboard = cache(async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  assertSupabaseEnv();

  const supabase = await createClient();
  const { data, error } = await supabase.rpc('get_leaderboard');

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }

  return ((data ?? []) as LeaderboardRpcRow[]).map((row) => ({
    profileId: row.profile_id,
    fullName: row.full_name,
    score: row.score ?? Number(row.total_weight ?? 0) * 100,
    currentStreak: row.current_streak ?? 0,
    completedWeight: Number(row.completed_weight ?? row.total_weight ?? 0),
  }));
});

export async function getAllProfiles(): Promise<Profile[]> {
  assertSupabaseEnv();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, role, subscription_status, created_at')
    .eq('role', 'member')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map(mapProfileRow);
}

export async function getProfileById(id: string): Promise<Profile> {
  assertSupabaseEnv();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, role, subscription_status, created_at')
    .eq('id', id)
    .single();

  if (error || !data) throw error ?? new Error('Profile not found');

  return mapProfileRow(data);
}

export async function getAllLogsWithProfiles(limit = 50, offset = 0): Promise<DailyLogWithProfile[]> {
  assertSupabaseEnv();

  const supabase = await createClient();
  return getJoinedLogs(
    supabase
      .from('daily_logs')
      .select(`
        id,
        profile_id,
        schedule_item_id,
        plan_id,
        nestuge_url,
        log_date,
        desc,
        created_at,
        profiles(full_name, email),
        schedule_items(label, date)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
  );
}

export async function getTodaysLogs(): Promise<DailyLogWithProfile[]> {
  assertSupabaseEnv();

  const supabase = await createClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  return getJoinedLogs(
    supabase
      .from('daily_logs')
      .select(`
        id,
        profile_id,
        schedule_item_id,
        plan_id,
        nestuge_url,
        log_date,
        desc,
        created_at,
        profiles(full_name, email),
        schedule_items(label, date)
      `)
      .gte('created_at', todayStart.toISOString())
      .order('created_at', { ascending: false })
  );
}

export async function getLogById(id: string): Promise<DailyLogWithProfile> {
  assertSupabaseEnv();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('daily_logs')
    .select(`
      id,
      profile_id,
      schedule_item_id,
      plan_id,
      nestuge_url,
      log_date,
      desc,
      created_at,
      profiles(full_name, email),
      schedule_items(label, date)
    `)
    .eq('id', id)
    .single();

  if (error || !data) throw error ?? new Error('Log not found');

  return mapJoinedLogRow(data as unknown as JoinedLogRow);
}
