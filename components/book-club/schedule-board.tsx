import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  parseISO,
  startOfWeek,
} from 'date-fns';
import type { ScheduleItem } from '@/lib/book-club/types';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function buildCalendarWeeks(items: ScheduleItem[]) {
  if (items.length === 0) {
    return [];
  }

  const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date));
  const first = parseISO(sorted[0].date);
  const last = parseISO(sorted.at(-1)!.date);
  const rangeStart = startOfWeek(first, { weekStartsOn: 1 });
  const rangeEnd = endOfWeek(last, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: rangeStart, end: rangeEnd });

  const weeks: Array<
    Array<{
      date: Date;
      item: ScheduleItem | null;
    }>
  > = [];

  for (let index = 0; index < days.length; index += 7) {
    const week = days.slice(index, index + 7).map((date) => {
      const item = sorted.find((entry) => isSameDay(parseISO(entry.date), date)) ?? null;
      return {
        date,
        item,
      };
    });
    weeks.push(week);
  }

  return weeks;
}

export function ScheduleBoard({ items }: { items: ScheduleItem[] }) {
  const weeks = buildCalendarWeeks(items);

  if (items.length === 0) {
    return (
      <section className='border border-dashed border-border bg-secondary/10 p-8 text-muted-foreground'>
        No schedule has been published for the active plan yet.
      </section>
    );
  }

  return (
    <section className='border border-border bg-background p-6'>
      <div className='mb-6'>
        <p className='text-xs font-bold uppercase tracking-[0.3em] text-primary'>Calendar Schedule</p>
        <h3 className='mt-2 font-serif text-3xl text-foreground'>
          {format(parseISO(items[0].date), 'MMMM yyyy')}
        </h3>
      </div>

      <div className='overflow-x-auto'>
        <div className='min-w-[760px]'>
          <div className='mb-3 grid grid-cols-7 gap-3'>
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className='border-b border-border pb-2 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'
              >
                {day}
              </div>
            ))}
          </div>

          <div className='space-y-3'>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className='grid grid-cols-7 gap-3'>
                {week.map((entry) => (
                  <article
                    key={entry.date.toISOString()}
                    className={
                      entry.item
                        ? 'min-h-48 border border-border bg-secondary/20 p-4'
                        : 'min-h-48 border border-dashed border-border/70 bg-background p-4'
                    }
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <p className='text-sm font-medium text-foreground'>
                        {format(entry.date, 'd')}
                      </p>
                      {entry.item ? (
                        <span className='border border-primary/25 bg-background px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary'>
                          {entry.item.type}
                        </span>
                      ) : null}
                    </div>

                    {entry.item ? (
                      <>
                        <p className='mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground'>
                          Day {entry.item.dayIndex}
                        </p>
                        <h4 className='mt-2 text-base font-medium leading-6 text-foreground'>
                          {entry.item.label}
                        </h4>
                        <p className='mt-3 text-sm leading-6 text-muted-foreground'>
                          {entry.item.description}
                        </p>
                      </>
                    ) : (
                      <div className='mt-8 text-sm text-muted-foreground'>No task</div>
                    )}
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
