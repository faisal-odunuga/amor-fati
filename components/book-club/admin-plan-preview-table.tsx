'use client';

import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  parseISO,
  startOfWeek,
} from 'date-fns';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/utils';
import type { ScheduleDraftItem, ScheduleItemType } from '@/lib/book-club/types';

const TYPE_OPTIONS: ScheduleItemType[] = ['reading', 'catchup', 'implementation', 'event'];
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function buildCalendarWeeks(items: ScheduleDraftItem[]) {
  const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date));
  const first = parseISO(sorted[0].date);
  const last = parseISO(sorted.at(-1)!.date);
  const rangeStart = startOfWeek(first, { weekStartsOn: 1 });
  const rangeEnd = endOfWeek(last, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: rangeStart, end: rangeEnd });

  const weeks: Array<
    Array<{
      date: Date;
      item: ScheduleDraftItem | null;
      itemIndex: number;
    }>
  > = [];

  for (let index = 0; index < days.length; index += 7) {
    const week = days.slice(index, index + 7).map((date) => {
      const itemIndex = sorted.findIndex((entry) => isSameDay(parseISO(entry.date), date));
      return {
        date,
        item: itemIndex >= 0 ? sorted[itemIndex] : null,
        itemIndex,
      };
    });

    weeks.push(week);
  }

  return weeks;
}

function MobileScheduleCard({
  item,
  index,
  onItemUpdate,
}: {
  item: ScheduleDraftItem;
  index: number;
  onItemUpdate: (index: number, patch: Partial<ScheduleDraftItem>) => void;
}) {
  const commonInputStyles = 'rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20';

  return (
    <div className='flex flex-col gap-3 border-b border-black/5 p-4 last:border-b-0 lg:hidden'>
      <div className='flex items-center justify-between gap-3'>
        <span className='text-[10px] font-bold uppercase tracking-widest text-black/40'>
          Day {item.dayIndex} • {format(parseISO(item.date), 'EEE, MMM d')}
        </span>
        <span className='text-[9px] uppercase tracking-[0.2em] text-black/35'>{item.type}</span>
      </div>
      <Input value={item.label} onChange={(e) => onItemUpdate(index, { label: e.target.value })} className={cn(commonInputStyles, 'h-10')} />
      <Textarea
        value={item.description}
        onChange={(e) => onItemUpdate(index, { description: e.target.value })}
        className={cn(commonInputStyles, 'min-h-[88px]')}
      />
      <div className='grid grid-cols-2 gap-3'>
        <select
          value={item.type}
          onChange={(e) => onItemUpdate(index, { type: e.target.value as ScheduleItemType })}
          className={cn(commonInputStyles, 'h-10 w-full px-3 text-sm')}
        >
          {TYPE_OPTIONS.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <Input
          type='number'
          step='0.25'
          value={item.weight}
          onChange={(e) => onItemUpdate(index, { weight: Number(e.target.value) })}
          className={cn(commonInputStyles, 'h-10')}
        />
      </div>
    </div>
  );
}

export function AdminPlanPreviewTable({
  items,
  title,
  isSaving,
  isDeleting = false,
  eyebrow = 'Review Required',
  heading = 'Schedule Calendar',
  description = 'Edit the plan directly in calendar form. Weekdays are reading slots, Saturday is catch-up, and Sunday is implementation/documentation.',
  saveLabel = 'Commit Plan',
  onTitleChange,
  onSave,
  onItemUpdate,
  onDelete,
}: {
  items: ScheduleDraftItem[];
  title: string;
  isSaving: boolean;
  isDeleting?: boolean;
  eyebrow?: string;
  heading?: string;
  description?: string;
  saveLabel?: string;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  onItemUpdate: (index: number, patch: Partial<ScheduleDraftItem>) => void;
  onDelete?: () => void;
}) {
  if (items.length === 0) {
    return (
      <section className='rounded-xl border border-dashed border-border bg-secondary/10 p-8 text-center text-muted-foreground'>
        Generate a draft first. Nothing is saved automatically.
      </section>
    );
  }

  const weeks = buildCalendarWeeks(items);
  const commonInputStyles = 'rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20';

  return (
    <section className='rounded-xl border border-black/10 bg-white p-4 shadow-[0_25px_70px_rgba(0,0,0,0.06)] sm:p-8'>
      <div className='mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end'>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517]'>{eyebrow}</p>
          <h3 className='mt-2 font-serif text-3xl text-black'>{heading}</h3>
          <p className='mt-3 max-w-2xl text-sm text-black/60'>
            {description}
          </p>
        </div>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end'>
          <div className='space-y-1.5'>
            <p className='text-[10px] font-bold uppercase tracking-widest text-black/40'>Internal Title</p>
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className='h-11 w-full rounded-none border-black/10 bg-[#faf7f1] lg:min-w-[240px]'
            />
          </div>
          {onDelete ? (
            <Button
              disabled={isSaving || isDeleting}
              variant='outline'
              className='h-11 w-full rounded-none border-red-200 bg-white px-8 font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 hover:text-red-700 sm:w-auto'
              onClick={() => void onDelete()}
            >
              {isDeleting ? <LoaderCircle className='mr-2 size-4 animate-spin' /> : null}
              Delete Plan
            </Button>
          ) : null}
          <Button
            disabled={isSaving || isDeleting}
            className='h-11 w-full rounded-none bg-[#d9a517] px-8 font-bold uppercase tracking-widest text-white hover:bg-[#b88c12] sm:w-auto'
            onClick={() => void onSave()}
          >
            {isSaving ? <LoaderCircle className='mr-2 size-4 animate-spin' /> : null}
            {saveLabel}
          </Button>
        </div>
      </div>

      <div className='rounded-lg border border-black/5 lg:hidden'>
        {items.map((item, index) => (
          <MobileScheduleCard key={`${item.date}-${index}`} item={item} index={index} onItemUpdate={onItemUpdate} />
        ))}
      </div>

      <div className='hidden overflow-hidden rounded-lg border border-black/5 lg:block'>
        <div className='grid grid-cols-7 gap-px bg-black/5'>
          {WEEKDAYS.map((day) => (
            <div key={day} className='bg-[#faf7f1] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-black/40'>
              {day}
            </div>
          ))}

          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className='contents'>
              {week.map(({ date, item, itemIndex }) => (
                <article
                  key={date.toISOString()}
                  className={cn('min-h-[300px] p-4', item ? 'bg-white' : 'bg-black/[0.02]')}
                >
                  <div className='mb-3 flex items-center justify-between gap-3'>
                    <span className={cn('text-xs font-medium', item ? 'text-black' : 'text-black/25')}>
                      {format(date, 'd')}
                    </span>
                    {item ? (
                      <span className='text-[8px] font-bold uppercase tracking-[0.2em] text-[#d9a517]'>
                        Day {item.dayIndex}
                      </span>
                    ) : null}
                  </div>

                  {item ? (
                    <div className='space-y-3'>
                      <Input
                        value={item.label}
                        onChange={(e) => onItemUpdate(itemIndex, { label: e.target.value })}
                        className={cn(commonInputStyles, 'h-10 text-sm')}
                      />
                      <Textarea
                        value={item.description}
                        onChange={(e) => onItemUpdate(itemIndex, { description: e.target.value })}
                        className={cn(commonInputStyles, 'min-h-[112px] text-xs leading-5')}
                      />
                      <select
                        value={item.type}
                        onChange={(e) => onItemUpdate(itemIndex, { type: e.target.value as ScheduleItemType })}
                        className={cn(commonInputStyles, 'h-10 w-full px-3 text-sm')}
                      >
                        {TYPE_OPTIONS.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <Input
                        type='number'
                        step='0.25'
                        value={item.weight}
                        onChange={(e) => onItemUpdate(itemIndex, { weight: Number(e.target.value) })}
                        className={cn(commonInputStyles, 'h-10')}
                      />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
