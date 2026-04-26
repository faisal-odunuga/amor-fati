import { InsightFeed } from '@/components/book-club/insight-feed';
import { LogForm } from '@/components/book-club/log-form';
import { BookClubShell } from '@/components/layouts/bookclub-shell';
import { getActiveReadingPlan, getScheduleItems } from '@/lib/book-club/queries';

export default async function MemberLogPage() {
  const [plan, scheduleItems] = await Promise.all([
    getActiveReadingPlan(),
    getScheduleItems(),
  ]);

  return (
    <BookClubShell>
    <div className='grid gap-8 xl:grid-cols-[1.05fr_0.95fr]'>
      <div>
        <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Proof of Work</p>
        <h1 className='mt-3 font-serif text-5xl text-black'>Log visible execution</h1>
        <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
          One valid log per schedule item. Nestuge URL is mandatory. Reflections are preserved as backup data for the internal journal system.
        </p>
        <div className='mt-8'>
          {plan && scheduleItems.length > 0 ? (
            <LogForm plan={plan} scheduleItems={scheduleItems} />
          ) : (
            <div className='rounded-xl border border-dashed border-black/10 bg-white p-12 text-center shadow-[0_25px_70px_rgba(0,0,0,0.06)]'>
              <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517] mb-4'>Action Blocked</p>
              <h2 className='font-serif text-3xl text-black mb-4'>No Active Cycle</h2>
              <p className='max-w-md mx-auto text-sm text-black/65'>
                Proof of work can only be recorded during an active reading cycle.
              </p>
            </div>
          )}
        </div>
      </div>

      <InsightFeed />
    </div>
    </BookClubShell>
  );
}
