import { format, parseISO } from 'date-fns';
import { MetricCard } from '@/components/book-club/metric-card';
import { ProgressSpotlight } from '@/components/book-club/progress-spotlight';
import { StreakBadge } from '@/components/book-club/streak-badge';
import { TodayFocusCard } from '@/components/book-club/today-focus-card';
import { BookClubShell } from '@/components/layouts/bookclub-shell';
import {
  getActiveReadingPlan,
  getCurrentBook,
  getDailyLogs,
  getScheduleItems,
  getStreak,
  getUserProgress,
} from '@/lib/book-club/queries';
import { calculateWeightedProgressFromCompletedWeight } from '@/lib/book-club/progress';

export default async function MemberDashboardPage() {
  const [plan, book, progress, streak, scheduleItems, logs] = await Promise.all([
    getActiveReadingPlan(),
    getCurrentBook(),
    getUserProgress(),
    getStreak(),
    getScheduleItems(),
    getDailyLogs(),
  ]);

  const percentage = calculateWeightedProgressFromCompletedWeight(
    progress.totalWeightCompleted,
    plan.totalWeight
  );
  const today =
    scheduleItems.find((item) => !logs.some((log) => log.scheduleItemId === item.id)) ??
    scheduleItems[0];

  if (!today) {
    return (
      <BookClubShell>
        <div className='border border-dashed border-border bg-secondary/10 p-8 text-muted-foreground'>
          No active schedule is available yet. Publish a plan from the admin dashboard first.
        </div>
      </BookClubShell>
    );
  }

  return (
    <BookClubShell>
    <div className='space-y-8'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Current Plan</p>
          <h1 className='mt-3 font-serif text-5xl text-black'>{plan.title}</h1>
          <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
            {book.title} by {book.author}. This platform tracks proof of execution, not just page completion.
          </p>
        </div>
        <StreakBadge streak={streak.currentStreak} longest={streak.longestStreak} />
      </div>

      <div className='grid gap-5 lg:grid-cols-3'>
        <MetricCard
          label='Completed'
          value={`${progress.completedDays} Days`}
          detail='Each log compounds your accountability record.'
        />
        <MetricCard
          label='Weight Banked'
          value={progress.totalWeightCompleted.toFixed(1)}
          detail='Weighted progress prioritizes implementation over passive reading.'
          tone='gold'
        />
        <MetricCard
          label='Last Active'
          value={progress.lastActiveDate ? format(parseISO(progress.lastActiveDate), 'MMM d') : 'Waiting'}
          detail='A 24–48h grace window protects the streak, not procrastination.'
        />
      </div>

      <div className='grid gap-8 xl:grid-cols-[1.15fr_0.85fr]'>
        <TodayFocusCard item={today} />
        <ProgressSpotlight
          percentage={percentage}
          completedLabel={`${progress.totalWeightCompleted.toFixed(1)} of ${plan.totalWeight.toFixed(1)} weighted points completed`}
          milestone={
            percentage >= 100
              ? 'Completion state'
              : percentage >= 50
                ? '50% milestone'
                : percentage >= 25
                  ? '25% milestone'
                  : 'On ramp'
          }
        />
      </div>
    </div>
    </BookClubShell>
  );
}
