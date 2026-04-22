import { MetricCard } from '@/components/book-club/metric-card';
import { ProgressSpotlight } from '@/components/book-club/progress-spotlight';
import { InsightFeed } from '@/components/book-club/insight-feed';
import { BookClubShell } from '@/components/layouts/bookclub-shell';
import { getActiveReadingPlan, getDailyLogs, getUserProgress } from '@/lib/book-club/queries';
import { calculateWeightedProgressFromCompletedWeight } from '@/lib/book-club/progress';

export default async function MemberProgressPage() {
  const [plan, progress, logs] = await Promise.all([
    getActiveReadingPlan(),
    getUserProgress(),
    getDailyLogs(),
  ]);
  const percentage = calculateWeightedProgressFromCompletedWeight(
    progress.totalWeightCompleted,
    plan.totalWeight
  );

  return (
    <BookClubShell>
    <div className='space-y-8'>
      <div>
        <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Transformation Ledger</p>
        <h1 className='mt-3 font-serif text-5xl text-black'>Progress that respects effort</h1>
      </div>

      <div className='grid gap-5 lg:grid-cols-3'>
        <MetricCard label='Completion' value={`${percentage.toFixed(0)}%`} detail='Computed from weighted contribution, not flat days.' />
        <MetricCard label='Days Logged' value={String(progress.completedDays)} detail='Unique schedule items only. Duplicate logging is blocked.' />
        <MetricCard label='Threshold' value={percentage >= 70 ? 'Testimonial ready' : 'In progress'} detail='Crossing 70% triggers a pending transformation summary.' tone='gold' />
      </div>

      <ProgressSpotlight
        percentage={percentage}
        completedLabel={`${progress.totalWeightCompleted.toFixed(1)} weighted points completed`}
        milestone={percentage >= 100 ? 'Completion state' : percentage >= 70 ? 'Testimonial threshold' : 'Momentum building'}
      />

      <InsightFeed logs={logs.slice(-8).reverse()} />
    </div>
    </BookClubShell>
  );
}
