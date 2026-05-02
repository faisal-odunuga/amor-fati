import { format, parseISO } from 'date-fns';
import { MetricCard } from '@/components/book-club/metric-card';
import { ProgressSpotlight } from '@/components/book-club/progress-spotlight';
import { StreakBadge } from '@/components/book-club/streak-badge';
import { TodayFocusCard } from '@/components/book-club/today-focus-card';
import { MissedDaysCard } from '@/components/book-club/missed-days-card';
import { LeaderboardCard } from '@/components/book-club/leaderboard-card';
import { BookClubShell } from '@/components/layouts/bookclub-shell';
import {
  getActiveReadingPlan,
  getCurrentBook,
  getDailyLogs,
  getScheduleItems,
  getStreak,
  getUserProgress,
  getLeaderboard,
  getMissedDays,
  getCurrentProfile,
  getUpcomingReadingPlan,
} from '@/lib/book-club/queries';
import { calculateWeightedProgressFromCompletedWeight } from '@/lib/book-club/progress';

export default async function MemberDashboardPage() {
  const profile = await getCurrentProfile();
  
  const [plan, upcomingPlan, book, progress, streak, scheduleItems, logs, leaderboard, missedDays] = await Promise.all([
    getActiveReadingPlan(),
    getUpcomingReadingPlan(),
    getCurrentBook(),
    getUserProgress(),
    getStreak(),
    getScheduleItems(),
    getDailyLogs(),
    getLeaderboard(),
    getMissedDays(profile.id),
  ]);

  const today = scheduleItems.find((item) => !logs.some((log) => log.scheduleItemId === item.id)) ?? scheduleItems[0];

  if (!plan || !today) {
    return (
      <BookClubShell>
        <div className='rounded-xl border border-dashed border-black/10 bg-white p-12 text-center shadow-[0_25px_70px_rgba(0,0,0,0.06)]'>
          <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517] mb-4'>Status Offline</p>
          <h2 className='font-serif text-3xl text-black mb-4'>No Active Schedule</h2>
          {upcomingPlan?.startDate ? (
            <p className='max-w-xl mx-auto text-sm text-black/65'>
              The previous reading cycle has ended. The next published plan is <span className='font-medium text-black'>{upcomingPlan.title}</span>,
              starting on <span className='font-medium text-black'>{format(parseISO(upcomingPlan.startDate), 'MMMM d, yyyy')}</span>.
            </p>
          ) : (
            <p className='max-w-md mx-auto text-sm text-black/65'>
              There is currently no active reading cycle. Check back soon or contact the administrator if you believe this is an error.
            </p>
          )}
        </div>
      </BookClubShell>
    );
  }

  const percentage = calculateWeightedProgressFromCompletedWeight(
    progress.totalWeightCompleted,
    plan.totalWeight
  );

  return (
    <BookClubShell>
      <div className='space-y-8 px-4 sm:px-0'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517]'>Current Plan</p>
            <h1 className='mt-3 font-serif text-4xl text-black sm:text-5xl'>{plan.title}</h1>
            <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
              {book?.title} by {book?.author}.
            </p>
          </div>
          <div className='self-start lg:self-center'>
            <StreakBadge streak={streak.currentStreak} longest={streak.longestStreak} />
          </div>
        </div>

        {missedDays.length > 0 && (
          <MissedDaysCard missedItems={missedDays} />
        )}

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5'>
          <MetricCard
            label='Completed'
            value={`${progress.completedDays} Days`}
            detail='Logs logged.'
          />
          <MetricCard
            label='Weight Banked'
            value={progress.totalWeightCompleted.toFixed(1)}
            detail='Weighted progress.'
            tone='gold'
          />
          <MetricCard
            label='Last Active'
            value={progress.lastActiveDate ? format(parseISO(progress.lastActiveDate), 'MMM d') : 'Waiting'}
            detail='Recent activity.'
          />
        </div>

        <div className='grid gap-8 xl:grid-cols-[1.15fr_0.85fr]'>
          <div className='space-y-8'>
            <TodayFocusCard item={today} />
            <ProgressSpotlight
              percentage={percentage}
              completedLabel={`${progress.totalWeightCompleted.toFixed(1)} of ${plan.totalWeight.toFixed(1)} weighted points`}
              milestone={
                percentage >= 100
                  ? 'Completion'
                  : percentage >= 50
                    ? '50% Milestone'
                    : percentage >= 25
                      ? '25% Milestone'
                      : 'Initial Ramp'
              }
            />
          </div>
          
          <div className='space-y-8'>
            <LeaderboardCard leaderboard={leaderboard} currentProfileId={profile.id} />
          </div>
        </div>
      </div>
    </BookClubShell>
  );
}
