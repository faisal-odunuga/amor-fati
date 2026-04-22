import { ScheduleBoard } from '@/components/book-club/schedule-board';
import { BookClubShell } from '@/components/layouts/bookclub-shell';
import { getScheduleItems } from '@/lib/book-club/queries';

export default async function MemberSchedulePage() {
  const scheduleItems = await getScheduleItems();

  return (
    <BookClubShell>
    <div className='space-y-6'>
      <div>
        <p className='text-xs uppercase tracking-[0.3em] text-[#d9a517]'>Reading System</p>
        <h1 className='mt-3 font-serif text-5xl text-black'>Weekly cadence</h1>
        <p className='mt-4 max-w-2xl text-sm leading-6 text-black/65'>
          Fridays are reserved for recovery. Saturdays are built for implementation. Every item carries an explicit behavioral demand.
        </p>
      </div>
      <ScheduleBoard items={scheduleItems} />
    </div>
    </BookClubShell>
  );
}
