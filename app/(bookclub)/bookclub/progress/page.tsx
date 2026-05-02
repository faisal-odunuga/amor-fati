import { MetricCard } from '@/components/book-club/metric-card';
import { ProgressSpotlight } from '@/components/book-club/progress-spotlight';
import { InsightFeed } from '@/components/book-club/insight-feed';
import { BookClubShell } from '@/components/layouts/bookclub-shell';
import { getActiveReadingPlan, getUserProgress } from '@/lib/book-club/queries';
import { calculateWeightedProgressFromCompletedWeight } from '@/lib/book-club/progress';

export default async function MemberProgressPage() {
  const [plan, progress] = await Promise.all([
    getActiveReadingPlan(),
    getUserProgress(),
  ]);
  if (!plan) {
    return (
      <BookClubShell>
        <div className='rounded-xl border border-dashed border-black/10 bg-white p-12 text-center shadow-[0_25px_70px_rgba(0,0,0,0.06)]'>
          <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517] mb-4'>Status Offline</p>
          <h2 className='font-serif text-3xl text-black mb-4'>No Progress Data</h2>
          <p className='max-w-md mx-auto text-sm text-black/65'>
            Progress tracking is unavailable because there is no active reading cycle.
          </p>
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

      <InsightFeed />
    </div>
    </BookClubShell>
  );
}
