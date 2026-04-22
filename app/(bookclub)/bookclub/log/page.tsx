import { InsightFeed } from '@/components/book-club/insight-feed';
import { LogForm } from '@/components/book-club/log-form';
import { BookClubShell } from '@/components/layouts/bookclub-shell';
import { getActiveReadingPlan, getDailyLogs, getScheduleItems } from '@/lib/book-club/queries';

export default async function MemberLogPage() {
  const [plan, scheduleItems, logs] = await Promise.all([
    getActiveReadingPlan(),
    getScheduleItems(),
    getDailyLogs(),
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
          {scheduleItems.length > 0 ? (
            <LogForm plan={plan} scheduleItems={scheduleItems} />
          ) : (
            <div className='border border-dashed border-border bg-secondary/10 p-8 text-muted-foreground'>
              No schedule items exist for the active plan yet.
            </div>
          )}
        </div>
      </div>

      <InsightFeed logs={logs.slice(-6).reverse()} />
    </div>
    </BookClubShell>
  );
}
