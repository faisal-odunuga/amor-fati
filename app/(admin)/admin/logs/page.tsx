import { InsightFeed } from '@/components/book-club/insight-feed';
import { AdminShell } from '@/components/layouts/admin-shell';
import { getDailyLogs } from '@/lib/book-club/queries';

export default async function AdminLogsPage() {
  const logs = await getDailyLogs();

  return (
    <AdminShell>
    <div className='space-y-6'>
      <div>
        <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Audit</p>
        <h1 className='mt-3 font-serif text-5xl text-black'>Recent logs</h1>
      </div>
      <InsightFeed logs={logs.slice(-10).reverse()} />
    </div>
    </AdminShell>
  );
}
