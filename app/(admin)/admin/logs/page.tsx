import { AdminShell } from '@/components/layouts/admin-shell';
import { getAllLogsWithProfiles } from '@/lib/book-club/queries';
import { LogsTable } from '@/components/book-club/logs-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function AdminLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  const logs = await getAllLogsWithProfiles(limit, offset);

  return (
    <AdminShell>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Audit</p>
            <h1 className='mt-3 font-serif text-5xl text-black'>All proof artifacts</h1>
          </div>
          <div className='flex items-center gap-2'>
            {page > 1 && (
              <Button asChild variant='outline' className='rounded-none h-10'>
                <Link href={`/admin/logs?page=${page - 1}`}>Previous</Link>
              </Button>
            )}
            <Button asChild variant='outline' className='rounded-none h-10'>
              <Link href={`/admin/logs?page=${page + 1}`}>Next</Link>
            </Button>
          </div>
        </div>
        
        <LogsTable logs={logs} />
      </div>
    </AdminShell>
  );
}
