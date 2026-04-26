import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  parseISO,
  startOfWeek,
} from 'date-fns';
import { CheckCircle2, Circle } from 'lucide-react';
import type { ScheduleItem } from '@/lib/book-club/types';
import { cn } from '@/utils';

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

export function ScheduleBoard({ 
  items, 
  loggedItemIds = new Set() 
}: { 
  items: ScheduleItem[];
  loggedItemIds?: Set<string>;
}) {
  const weeks = buildCalendarWeeks(items);

  if (items.length === 0) {
    return (
      <section className='border border-dashed border-black/10 bg-white p-12 text-center rounded-xl'>
        <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-black/40'>Cadence Status</p>
        <h2 className='mt-4 font-serif text-3xl text-black'>No items published yet</h2>
      </section>
    );
  }

  const activeItems = items.sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section className='space-y-8'>
      {/* Page Header Area is in the parent page */}
      
      {/* Mobile Stack View */}
      <div className='space-y-4 lg:hidden'>
        {activeItems.map((item) => {
          const isLogged = loggedItemIds.has(item.id);
          return (
            <article
              key={item.id}
              className={cn(
                'relative overflow-hidden border p-6 transition-all duration-300',
                isLogged 
                  ? 'border-[#d9a517]/30 bg-white shadow-[0_15px_40px_rgba(217,165,23,0.05)]' 
                  : 'border-black/5 bg-white'
              )}
            >
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <div className='flex items-center gap-3'>
                    <span className='text-[10px] font-bold uppercase tracking-widest text-black/40'>
                      Day {item.dayIndex} • {format(parseISO(item.date), 'MMM d')}
                    </span>
                    {isLogged && (
                      <span className='flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#d9a517] bg-[#d9a517]/5 px-2 py-0.5'>
                        <CheckCircle2 className='size-3' /> Verified
                      </span>
                    )}
                  </div>
                  <h4 className='mt-3 font-serif text-xl text-black'>{item.label}</h4>
                </div>
                <div className='shrink-0'>
                  <span className='border border-black/5 bg-black/[0.02] px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-black/45'>
                    {item.type}
                  </span>
                </div>
              </div>
              <p className='mt-4 text-sm leading-6 text-black/60'>{item.description}</p>
              
              {isLogged && (
                <div className='absolute right-0 top-0 h-1 w-24 bg-[#d9a517]' />
              )}
            </article>
          );
        })}
      </div>

      {/* Desktop Calendar View */}
      <div className='hidden lg:block border border-black/10 bg-white p-8 shadow-[0_25px_70px_rgba(0,0,0,0.06)] rounded-xl'>
        <div className='mb-10 flex items-center justify-between'>
          <div>
            <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517]'>Monthly View</p>
            <h3 className='mt-2 font-serif text-3xl text-black'>
              {format(parseISO(items[0].date), 'MMMM yyyy')}
            </h3>
          </div>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2'>
              <div className='size-2 bg-[#d9a517]' />
              <span className='text-[10px] font-bold uppercase tracking-widest text-black/40'>Logged Proof</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='size-2 bg-black/5' />
              <span className='text-[10px] font-bold uppercase tracking-widest text-black/40'>Pending Action</span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-7 gap-px bg-black/5'>
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className='bg-[#faf7f1] py-3 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 border-b border-black/5'
            >
              {day}
            </div>
          ))}
          
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className='contents'>
              {week.map((entry) => {
                const isLogged = entry.item && loggedItemIds.has(entry.item.id);
                return (
                  <article
                    key={entry.date.toISOString()}
                    className={cn(
                      'min-h-[200px] p-4 transition-all duration-300',
                      entry.item ? 'bg-white' : 'bg-black/[0.01]',
                      isLogged && 'bg-gradient-to-br from-white to-[#d9a517]/5'
                    )}
                  >
                    <div className='flex items-center justify-between'>
                      <span className={cn(
                        'text-xs font-medium',
                        entry.item ? 'text-black' : 'text-black/20'
                      )}>
                        {format(entry.date, 'd')}
                      </span>
                      {entry.item && (
                        <div className='flex items-center gap-1.5'>
                          {isLogged ? (
                            <CheckCircle2 className='size-3.5 text-[#d9a517]' />
                          ) : (
                            <span className='text-[8px] font-bold uppercase tracking-widest text-black/30'>
                              {entry.item.type}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {entry.item && (
                      <div className='mt-5 space-y-3'>
                        <div className='flex items-center gap-2'>
                          <span className='text-[8px] font-bold uppercase tracking-[0.2em] text-[#d9a517]'>
                            Day {entry.item.dayIndex}
                          </span>
                        </div>
                        <h4 className='font-serif text-sm font-medium leading-tight text-black group-hover:text-[#d9a517]'>
                          {entry.item.label}
                        </h4>
                        <p className='text-[11px] leading-relaxed text-black/50 line-clamp-3'>
                          {entry.item.description}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
