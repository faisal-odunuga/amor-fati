import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { assertSupabaseEnv, getTodayIsoDate, mapScheduleItemRow } from '@/lib/book-club/query-core';
import type { AdminEditablePlan, ReadingPlan, ScheduleItem } from '@/lib/book-club/types';

function mapReadingPlan(
  plan: {
    id: string;
    book_id: string | null;
    month_date: string;
    title: string;
    is_active: boolean;
  },
  scheduleItems: ScheduleItem[]
): ReadingPlan {
  return {
    id: plan.id,
    bookId: plan.book_id ?? '',
    monthDate: plan.month_date,
    title: plan.title,
    isActive: plan.is_active,
    totalWeight: scheduleItems.reduce((sum, item) => sum + item.weight, 0),
    startDate: scheduleItems[0]?.date ?? null,
    endDate: scheduleItems.at(-1)?.date ?? null,
  };
}

async function getScheduleItemsByPlanIds(planIds: string[]) {
  if (planIds.length === 0) {
    return new Map<string, ScheduleItem[]>();
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('schedule_items')
    .select('id, plan_id, date, day_index, label, description, type, weight, created_at')
    .in('plan_id', planIds)
    .order('date', { ascending: true });

  if (error) {
    throw error;
  }

  const grouped = new Map<string, ScheduleItem[]>();
  for (const row of data ?? []) {
    const item = mapScheduleItemRow(row);
    const entries = grouped.get(item.planId) ?? [];
    entries.push(item);
    grouped.set(item.planId, entries);
  }

  return grouped;
}

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

  return (data ?? []).map(mapScheduleItemRow);
});

const getPublishedReadingPlans = cache(async function getPublishedReadingPlans(): Promise<ReadingPlan[]> {
  assertSupabaseEnv();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reading_plans')
    .select('id, book_id, month_date, title, is_active')
    .eq('is_active', true)
    .order('month_date', { ascending: true });

  if (error) {
    console.error('getPublishedReadingPlans Error:', error);
    throw new Error(`Published plan lookup failed: ${error.message}`);
  }

  if (!data?.length) return [];

  const scheduleItemsByPlanId = await getScheduleItemsByPlanIds(data.map((plan) => plan.id));
  const plans = data.map((plan) => mapReadingPlan(plan, scheduleItemsByPlanId.get(plan.id) ?? []));

  return plans.filter((plan) => plan.startDate && plan.endDate);
});

export const getActiveReadingPlan = cache(async function getActiveReadingPlan(): Promise<ReadingPlan | null> {
  const today = getTodayIsoDate();
  const plans = await getPublishedReadingPlans();

  return plans.find((plan) => plan.startDate! <= today && plan.endDate! >= today) ?? null;
});

export const getUpcomingReadingPlan = cache(async function getUpcomingReadingPlan(): Promise<ReadingPlan | null> {
  const today = getTodayIsoDate();
  const plans = await getPublishedReadingPlans();

  return plans.find((plan) => plan.startDate! > today) ?? null;
});

export const getLoggableReadingPlan = cache(async function getLoggableReadingPlan(): Promise<ReadingPlan | null> {
  const activePlan = await getActiveReadingPlan();
  if (activePlan) return activePlan;

  const today = getTodayIsoDate();
  const plans = await getPublishedReadingPlans();
  const completedPlans = plans.filter((plan) => plan.endDate! < today);

  return completedPlans.at(-1) ?? null;
});

export async function getAllReadingPlansForAdmin(): Promise<AdminEditablePlan[]> {
  assertSupabaseEnv();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reading_plans')
    .select('id, book_id, month_date, title, is_active')
    .order('month_date', { ascending: false });

  if (error || !data) {
    return [];
  }

  const scheduleItemsByPlanId = await getScheduleItemsByPlanIds(data.map((plan) => plan.id));

  return data.map((plan) => {
    const items = scheduleItemsByPlanId.get(plan.id) ?? [];

    return {
      ...mapReadingPlan(plan, items),
      items: items.map((item) => ({
        id: item.id,
        date: item.date,
        dayIndex: item.dayIndex,
        label: item.label,
        description: item.description,
        type: item.type,
        weight: item.weight,
      })),
    };
  });
}
