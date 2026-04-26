import { AdminShell } from '@/components/layouts/admin-shell';
import { getAllProfiles, getAdminAnalytics } from '@/lib/book-club/queries';
import { MembersTable } from '@/components/book-club/members-table';
import { MetricCard } from '@/components/book-club/metric-card';

export default async function AdminMembersPage() {
  const [members, analytics] = await Promise.all([
    getAllProfiles(),
    getAdminAnalytics()
  ]);

  return (
    <AdminShell>
      <div className='space-y-8 px-4 sm:px-0'>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517]'>Members</p>
          <h1 className='mt-3 font-serif text-4xl text-black sm:text-5xl'>Community Overview</h1>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5'>
          <MetricCard label='Total Members' value={String(members.length)} detail='Total registered users.' tone='gold' />
          <MetricCard label='Active Members' value={String(members.filter(m => m.subscriptionStatus === 'active').length)} detail='Members with active status.' />
          <MetricCard label='Platform Avg' value={`${analytics.completionRate}%`} detail='Average weighted completion rate.' />
        </div>

        <div className='space-y-4'>
          <h2 className='font-serif text-2xl text-black'>Directory</h2>
          <MembersTable members={members} />
        </div>
      </div>
    </AdminShell>
  );
}
