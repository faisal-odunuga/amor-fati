import { differenceInCalendarDays, parseISO } from 'date-fns';
import { WEIGHTS_BY_TYPE } from '@/lib/book-club/constants';
import type { DailyLog, ScheduleItem, ScheduleItemType, Streak } from '@/lib/book-club/types';

export function getWeightForType(type: ScheduleItemType) {
  return WEIGHTS_BY_TYPE[type];
}

export function calculateWeightedProgress(
  scheduleItems: Array<Pick<ScheduleItem, 'id' | 'weight'>>,
  logs: DailyLog[]
) {
  const totalWeight = scheduleItems.reduce((sum, item) => sum + item.weight, 0);
  const totalWeightCompleted = logs.reduce(
    (sum, log) => sum + (scheduleItems.find((item) => item.id === log.scheduleItemId)?.weight ?? 0),
    0
  );

  return {
    totalWeight,
    totalWeightCompleted,
    percentage: totalWeight === 0 ? 0 : Math.min(100, (totalWeightCompleted / totalWeight) * 100),
  };
}

export function calculateWeightedProgressFromCompletedWeight(
  totalWeightCompleted: number,
  totalWeight: number
) {
  return totalWeight === 0 ? 0 : Math.min(100, (totalWeightCompleted / totalWeight) * 100);
}

export function updateStreak(previous: Streak | null, loggedAt: string) {
  if (!previous?.lastActiveDate) {
    return {
      profileId: previous?.profileId ?? '',
      currentStreak: 1,
      longestStreak: Math.max(previous?.longestStreak ?? 0, 1),
      lastActiveDate: loggedAt,
    };
  }

  const daysBetween = differenceInCalendarDays(parseISO(loggedAt), parseISO(previous.lastActiveDate));
  const shouldContinue = daysBetween <= 2;
  const currentStreak = daysBetween === 0 ? previous.currentStreak : shouldContinue ? previous.currentStreak + 1 : 1;

  return {
    profileId: previous.profileId,
    currentStreak,
    longestStreak: Math.max(previous.longestStreak, currentStreak),
    lastActiveDate: loggedAt,
  };
}

export function shouldGenerateTestimonial(progressPercentage: number) {
  return progressPercentage >= 70;
}
