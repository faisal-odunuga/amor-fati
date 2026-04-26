import { Trophy, Flame, Target, MessageSquare } from 'lucide-react';
import { MetricCard } from '@/components/book-club/metric-card';
import { AdminShell } from '@/components/layouts/admin-shell';
import Link from 'next/link';
import { getAdminAnalytics, getTestimonials, getLeaderboard, getTodaysLogs } from '@/lib/book-club/queries';
import { PlatformSection } from '@/components/ui/platform-section';

export default async function AdminDashboardPage() {
  const [analytics, testimonials, leaderboard, todaysLogs] = await Promise.all([
    getAdminAnalytics(),
    getTestimonials(),
    getLeaderboard(),
    getTodaysLogs(),
  ]);

  return (
    <AdminShell>
      <div className='space-y-8 px-4 sm:px-0'>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517]'>Analytics</p>
          <h1 className='mt-3 font-serif text-4xl text-black sm:text-5xl'>Operator dashboard</h1>
          <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
            Completion rate, drop-off diagnostics, and recent member proof live here.
          </p>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5'>
          <MetricCard label='Completion Rate' value={`${analytics.completionRate}%`} detail='Weighted average across active members.' tone='gold' />
          <MetricCard label='Active Users' value={String(analytics.activeUsers)} detail='Members with recent proof logged.' />
          <MetricCard label='Pending Testimonials' value={String(testimonials.filter((item) => item.status === 'pending').length)} detail='Auto-generated social proof awaiting review.' />
        </div>

        <div className='grid gap-6 xl:grid-cols-2'>
          <PlatformSection title='Drop-off Days' eyebrow='Diagnostics'>
            <div className='space-y-3'>
              {analytics.dropOffDays.map((item) => (
                <div key={item.date} className='flex items-center justify-between rounded-none border border-black/8 bg-[#faf7f1] px-5 py-4'>
                  <span className='text-sm font-medium text-black'>{item.date}</span>
                  <span className='text-xs uppercase tracking-wider text-black/45'>{item.missCount} misses</span>
                </div>
              ))}
            </div>
          </PlatformSection>

          <PlatformSection title='Most Skipped' eyebrow='Behavior'>
            <div className='space-y-3'>
              {analytics.mostSkippedItems.map((item) => (
                <div key={item.scheduleItemId} className='rounded-none border border-black/8 bg-[#faf7f1] px-5 py-4'>
                  <h3 className='text-base font-medium text-black'>{item.label}</h3>
                  <p className='mt-1 text-xs text-black/55'>{item.missCount} members skipped this item.</p>
                </div>
              ))}
            </div>
          </PlatformSection>
        </div>

        <PlatformSection 
          title='Recent Activity' 
          eyebrow='Live Feed' 
          icon={<MessageSquare className='size-4 text-[#d9a517]' />}
        >
          {todaysLogs.length === 0 ? (
            <p className='text-sm text-black/55 py-8 text-center border border-dashed border-black/10'>No proof logged today yet.</p>
          ) : (
            <div className='space-y-3'>
              {todaysLogs.map((log) => (
                <div key={log.id} className='rounded-none border border-black/8 bg-[#faf7f1] px-5 py-4'>
                  <div className='flex flex-wrap items-center justify-between gap-2'>
                    <p className='font-serif text-lg text-black'>{log.profile.fullName}</p>
                    <span className='text-[9px] font-bold uppercase tracking-widest text-[#d9a517] bg-[#d9a517]/10 px-2 py-1'>
                      {log.scheduleItem?.label}
                    </span>
                  </div>
                  <p className='mt-2 text-sm text-black/65 line-clamp-2 italic'>
                    "{log.desc || 'No reflection provided.'}"
                  </p>
                  <div className='mt-4 flex items-center gap-6'>
                    <a href={log.nestugeUrl} target='_blank' rel='noopener noreferrer' className='text-[10px] font-bold uppercase tracking-widest text-[#d9a517] hover:underline'>
                      View Proof →
                    </a>
                    <Link href={`/admin/logs/${log.id}`} className='text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black'>
                      Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </PlatformSection>

        <PlatformSection 
          title='Member Leaderboard' 
          eyebrow='Accountability' 
          icon={<Trophy className='size-4 text-[#d9a517]' />}
        >
          {leaderboard.length === 0 ? (
            <p className='text-sm text-black/55 py-8 text-center border border-dashed border-black/10'>No leaderboard data yet.</p>
          ) : (
            <div className='space-y-3'>
              {leaderboard.map((entry, index) => {
                const rank = index + 1;
                return (
                  <div key={entry.profileId} className='flex items-center justify-between rounded-none border border-black/8 bg-[#faf7f1] px-5 py-4'>
                    <div className='flex items-center gap-4'>
                      <div className={`flex size-8 shrink-0 items-center justify-center font-serif text-sm ${rank <= 3 ? 'bg-[#d9a517] text-white' : 'bg-black/5 text-black/40'}`}>
                        {rank}
                      </div>
                      <div>
                        <p className='font-medium text-black'>{entry.fullName}</p>
                        <div className='mt-1 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest text-black/40'>
                          <span className='flex items-center gap-1'><Target className='size-3' /> {entry.completedWeight.toFixed(1)} Wt</span>
                          <span className='flex items-center gap-1'><Flame className='size-3 text-orange-500' /> {entry.currentStreak}d streak</span>
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-lg font-serif text-black sm:text-xl'>{entry.score.toLocaleString()}</p>
                      <p className='text-[9px] uppercase tracking-wider text-black/40'>Score</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </PlatformSection>
      </div>
    </AdminShell>
  );
}
