import { MetricCard } from '@/components/book-club/metric-card';
import { AdminShell } from '@/components/layouts/admin-shell';
import { getAdminAnalytics, getTestimonials } from '@/lib/book-club/queries';

export default async function AdminDashboardPage() {
  const [analytics, testimonials] = await Promise.all([getAdminAnalytics(), getTestimonials()]);

  return (
    <AdminShell>
    <div className='space-y-8'>
      <div>
        <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Analytics</p>
        <h1 className='mt-3 font-serif text-5xl text-black'>Operator dashboard</h1>
        <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
          Completion rate, drop-off diagnostics, and pending proof artifacts live here. The platform is optimized for accountability, not vanity metrics.
        </p>
      </div>

      <div className='grid gap-5 lg:grid-cols-3'>
        <MetricCard label='Completion Rate' value={`${analytics.completionRate}%`} detail='Weighted average across active members.' tone='gold' />
        <MetricCard label='Active Users' value={String(analytics.activeUsers)} detail='Members with recent proof logged.' />
        <MetricCard label='Pending Testimonials' value={String(testimonials.filter((item) => item.status === 'pending').length)} detail='Auto-generated social proof awaiting review.' />
      </div>

      <div className='grid gap-6 xl:grid-cols-2'>
        <section className='rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.06)]'>
          <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Drop-off Days</p>
          <div className='mt-6 space-y-4'>
            {analytics.dropOffDays.map((item) => (
              <div key={item.date} className='flex items-center justify-between rounded-[1.5rem] border border-black/8 bg-[#faf7f1] px-5 py-4'>
                <span className='text-black'>{item.date}</span>
                <span className='text-sm text-black/55'>{item.missCount} misses</span>
              </div>
            ))}
          </div>
        </section>

        <section className='rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.06)]'>
          <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Most Skipped</p>
          <div className='mt-6 space-y-4'>
            {analytics.mostSkippedItems.map((item) => (
              <div key={item.scheduleItemId} className='rounded-[1.5rem] border border-black/8 bg-[#faf7f1] px-5 py-4'>
                <h3 className='text-lg text-black'>{item.label}</h3>
                <p className='mt-2 text-sm text-black/55'>{item.missCount} members skipped this item.</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
    </AdminShell>
  );
}
