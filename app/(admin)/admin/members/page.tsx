import { MetricCard } from '@/components/book-club/metric-card';
import { AdminShell } from '@/components/layouts/admin-shell';
import { getAdminAnalytics } from '@/lib/book-club/queries';

export default async function AdminMembersPage() {
  const analytics = await getAdminAnalytics();

  return (
    <AdminShell>
    <div className='space-y-8'>
      <div>
        <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Members</p>
        <h1 className='mt-3 font-serif text-5xl text-black'>Retention and activation</h1>
      </div>

      <div className='grid gap-5 lg:grid-cols-3'>
        <MetricCard label='Active' value={String(analytics.activeUsers)} detail='Members currently engaging the proof loop.' tone='gold' />
        <MetricCard label='Completion' value={`${analytics.completionRate}%`} detail='Average weighted completion rate.' />
        <MetricCard label='Priority' value='Recovery cohort' detail='Focus on members stalled before the first major milestone.' />
      </div>
    </div>
    </AdminShell>
  );
}
