import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { assertSupabaseEnv, getCurrentProfile, mapDailyLogRow, getTodayIsoDate } from '@/lib/book-club/query-core';
import { getActiveReadingPlan, getScheduleItems } from '@/lib/book-club/plan-queries';
import type { DailyLog, Streak, UserProgress } from '@/lib/book-club/types';

export const getDailyLogs = cache(async function getDailyLogs(profileId?: string): Promise<DailyLog[]> {
  assertSupabaseEnv();

  const resolvedId = profileId ?? (await getCurrentProfile()).id;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('daily_logs')
    .select('id, profile_id, schedule_item_id, plan_id, nestuge_url, log_date, desc, created_at')
    .eq('profile_id', resolvedId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapDailyLogRow);
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

export const getMissedDays = cache(async function getMissedDays(profileId?: string) {
  const [scheduleItems, logs] = await Promise.all([getScheduleItems(), getDailyLogs(profileId)]);

  const today = getTodayIsoDate();
  const loggedItemIds = new Set(logs.map((log) => log.scheduleItemId));

  return scheduleItems.filter((item) => item.date <= today && !loggedItemIds.has(item.id));
});
