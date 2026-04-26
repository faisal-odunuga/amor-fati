import { AdminShell } from '@/components/layouts/admin-shell';
import { getLogById } from '@/lib/book-club/queries';
import { notFound } from 'next/navigation';
import { ExternalLink, Calendar, User, Clock, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function AdminLogDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  try {
    const log = await getLogById(id);

    return (
      <AdminShell>
        <div className='max-w-4xl space-y-8'>
          <div className='flex items-center gap-2 text-xs uppercase tracking-widest text-black/40'>
            <Link href="/admin/logs" className='hover:text-[#d9a517]'>Logs</Link>
            <span>/</span>
            <span className='text-black/60'>Log Details</span>
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <h1 className='font-serif text-5xl text-black'>Proof Audit</h1>
              <p className='mt-2 text-black/50'>Reviewing submission for {log.profile.fullName}</p>
            </div>
            <Button asChild variant="outline" className="rounded-none border-black/10">
              <a href={log.nestugeUrl} target="_blank" rel="noopener noreferrer">
                Open Original Proof <ExternalLink className='ml-2 size-4' />
              </a>
            </Button>
          </div>

          <div className='grid gap-6 md:grid-cols-2'>
            <section className='rounded-xl border border-black/10 bg-white p-8 shadow-[0_25px_70px_rgba(0,0,0,0.06)]'>
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <User className='mt-1 size-5 text-[#d9a517]' />
                  <div>
                    <p className='text-[10px] font-bold uppercase tracking-widest text-black/30'>Member</p>
                    <p className='mt-1 font-medium text-black'>{log.profile.fullName}</p>
                    <p className='text-sm text-black/40'>{log.profile.email}</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <Bookmark className='mt-1 size-5 text-[#d9a517]' />
                  <div>
                    <p className='text-[10px] font-bold uppercase tracking-widest text-black/30'>Schedule Item</p>
                    <p className='mt-1 font-medium text-black'>{log.scheduleItem?.label}</p>
                    <p className='text-sm text-black/40'>Assigned Date: {log.scheduleItem?.date}</p>
                  </div>
                </div>


                <div className='flex items-start gap-4'>
                  <Clock className='mt-1 size-5 text-[#d9a517]' />
                  <div>
                    <p className='text-[10px] font-bold uppercase tracking-widest text-black/30'>Submitted At</p>
                    <p className='mt-1 font-medium text-black'>
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='rounded-xl border border-black/10 bg-[#faf7f1] p-8'>
              <p className='text-[10px] font-bold uppercase tracking-widest text-black/30'>Reflection / Description</p>
              <div className='mt-6 text-lg leading-relaxed text-black/80 italic'>
                {log.desc ? (
                  `"${log.desc}"`
                ) : (
                  <span className='text-black/30 font-sans not-italic'>No reflection was provided for this log.</span>
                )}
              </div>
            </section>
          </div>
        </div>
      </AdminShell>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
