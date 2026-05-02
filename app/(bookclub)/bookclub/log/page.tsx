import { format, parseISO } from 'date-fns';
import { InsightFeed } from '@/components/book-club/insight-feed';
import { LogForm } from '@/components/book-club/log-form';
import { BookClubShell } from '@/components/layouts/bookclub-shell';
import { getActiveReadingPlan, getLoggableReadingPlan, getScheduleItems } from '@/lib/book-club/queries';

export default async function MemberLogPage() {
  const [activePlan, plan] = await Promise.all([
    getActiveReadingPlan(),
    getLoggableReadingPlan(),
  ]);
  const scheduleItems = plan ? await getScheduleItems(plan.id) : [];

  return (
    <BookClubShell>
    <div className='grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-[1fr_1fr]'>
      <div>
        <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Proof of Work</p>
        <h1 className='mt-3 font-serif text-5xl text-black'>Log visible execution</h1>
        <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
          One valid log per schedule item. Nestuge URL is mandatory. Reflections are preserved as backup data for the internal journal system.
        </p>
        <div className='mt-8'>
          {plan && scheduleItems.length > 0 ? (
            <div className='space-y-4'>
              {!activePlan && plan.endDate ? (
                <div className='rounded-xl border border-black/10 bg-[#faf7f1] p-5 text-sm text-black/70 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'>
                  There is no current reading cycle right now. You can still log against the most recent published plan,
                  <span className='font-medium text-black'> {plan.title}</span>, which ended on{' '}
                  <span className='font-medium text-black'>{format(parseISO(plan.endDate), 'MMMM d, yyyy')}</span>.
                </div>
              ) : null}
              <LogForm plan={plan} scheduleItems={scheduleItems} />
            </div>
          ) : (
            <div className='rounded-xl border border-dashed border-black/10 bg-white p-12 text-center shadow-[0_25px_70px_rgba(0,0,0,0.06)]'>
              <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517] mb-4'>Action Blocked</p>
              <h2 className='font-serif text-3xl text-black mb-4'>No Available Plan</h2>
              <p className='max-w-md mx-auto text-sm text-black/65'>
                There is no current plan and no previous published plan available for logging.
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
