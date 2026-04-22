import type { DailyLog, Profile, ReadingPlan } from '@/lib/book-club/types';

export function buildGeneratedTestimonial(params: {
  profile: Profile;
  plan: ReadingPlan;
  completedDays: number;
  keyInsight?: string | null;
  actionTaken?: string | null;
}) {
  const { profile, completedDays, keyInsight, actionTaken } = params;

  return `${profile.fullName} completed ${completedDays} days of consistent reading. Key insight: ${
    keyInsight || 'Discipline beats motivation.'
  } Applied: ${actionTaken || 'Built a daily execution habit.'}`;
}

export function getLastInsight(logs: DailyLog[]) {
  return logs.at(-1)?.keyInsight ?? null;
}

export function getLastAction(logs: DailyLog[]) {
  return logs.at(-1)?.actionTaken ?? null;
}
