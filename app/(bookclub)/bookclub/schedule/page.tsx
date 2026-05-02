import { format, parseISO } from 'date-fns';
import { ScheduleBoard } from '@/components/book-club/schedule-board';
import { BookClubShell } from '@/components/layouts/bookclub-shell';
import { getScheduleItems, getDailyLogs, getUpcomingReadingPlan } from '@/lib/book-club/queries';

export default async function MemberSchedulePage() {
  const [scheduleItems, logs, upcomingPlan] = await Promise.all([
    getScheduleItems(),
    getDailyLogs(),
    getUpcomingReadingPlan(),
  ]);

  const loggedItemIds = new Set(logs.map(log => log.scheduleItemId));

  return (
    <BookClubShell>
    <div className='space-y-6'>
      <div>
        <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Reading System</p>
        <h1 className='mt-3 font-serif text-5xl text-black'>Weekly cadence</h1>
        <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
          Monday through Friday are for reading. Saturday is for catch-up. Sunday is for implementation and documentation.
        </p>
      </div>
      {scheduleItems.length > 0 ? (
        <ScheduleBoard items={scheduleItems} loggedItemIds={loggedItemIds} />
      ) : (
        <div className='rounded-xl border border-dashed border-black/10 bg-white p-12 text-center shadow-[0_25px_70px_rgba(0,0,0,0.06)]'>
          <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517] mb-4'>Status Offline</p>
          <h2 className='font-serif text-3xl text-black mb-4'>No Active Cadence</h2>
          {upcomingPlan?.startDate ? (
            <p className='max-w-xl mx-auto text-sm text-black/65'>
              The current plan has ended. The next published reading cycle is <span className='font-medium text-black'>{upcomingPlan.title}</span>,
              starting on <span className='font-medium text-black'>{format(parseISO(upcomingPlan.startDate), 'MMMM d, yyyy')}</span>.
            </p>
          ) : (
            <p className='max-w-md mx-auto text-sm text-black/65'>
              The reading system is currently between cycles. Check back soon for the new schedule.
            </p>
          )}
        </div>
      )}
    </div>
    </BookClubShell>
  );
}
