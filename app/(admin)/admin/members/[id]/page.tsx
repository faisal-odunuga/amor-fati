import { AdminShell } from '@/components/layouts/admin-shell';
import { getProfileById, getStreak, getUserProgress, getDailyLogs, getActiveReadingPlan } from '@/lib/book-club/queries';
import { MetricCard } from '@/components/book-club/metric-card';
import { StreakBadge } from '@/components/book-club/streak-badge';
import { LogsTable } from '@/components/book-club/logs-table';
import { calculateWeightedProgressFromCompletedWeight } from '@/lib/book-club/progress';
import { ProgressSpotlight } from '@/components/book-club/progress-spotlight';
import { notFound } from 'next/navigation';

export default async function AdminMemberDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  try {
    const [profile, streak, progress, logs, plan] = await Promise.all([
      getProfileById(id),
      getStreak(id),
      getUserProgress(id),
      getDailyLogs(id),
      getActiveReadingPlan()
    ]);

    const percentage = calculateWeightedProgressFromCompletedWeight(
      progress.totalWeightCompleted,
      plan.totalWeight
    );

    // Map logs to DailyLogWithProfile format for the LogsTable
    const logsWithProfile = logs.map(log => ({
      ...log,
      profile: {
        fullName: profile.fullName,
        email: profile.email
      }
    }));

    return (
      <AdminShell>
        <div className='space-y-8'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Member Details</p>
              <h1 className='mt-3 font-serif text-5xl text-black'>{profile.fullName}</h1>
              <p className='mt-2 text-black/50'>{profile.email} · Joined {new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
            <StreakBadge streak={streak.currentStreak} longest={streak.longestStreak} />
          </div>

          <div className='grid gap-5 lg:grid-cols-3'>
            <MetricCard label='Completed Days' value={`${progress.completedDays} Days`} detail='Total sessions logged.' />
            <MetricCard label='Weight Banked' value={progress.totalWeightCompleted.toFixed(1)} detail='Cumulative weighted progress.' tone='gold' />
            <MetricCard label='Last Active' value={progress.lastActiveDate ? new Date(progress.lastActiveDate).toLocaleDateString() : 'Never'} detail='Most recent engagement.' />
          </div>

          <div className='grid gap-8 xl:grid-cols-[1.15fr_0.85fr]'>
            <div className='space-y-8'>
              <h2 className='font-serif text-2xl text-black'>Progress Roadmap</h2>
              <ProgressSpotlight 
                percentage={percentage} 
                completedLabel={`${progress.totalWeightCompleted.toFixed(1)} / ${plan.totalWeight.toFixed(1)} points`}
                milestone='Member Progression'
              />
            </div>
            
            <div className='space-y-4'>
              <h2 className='font-serif text-2xl text-black'>Activity Logs</h2>
              <LogsTable logs={logsWithProfile.slice().reverse()} />
            </div>
          </div>
        </div>
      </AdminShell>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
