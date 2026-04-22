'use client';

import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ReadingPlan, ScheduleItem } from '@/lib/book-club/types';
import { useLogSubmission } from '@/hooks/use-log-submission';

type LogFormProps = {
  plan: ReadingPlan;
  scheduleItems: ScheduleItem[];
};

export function LogForm({ plan, scheduleItems }: LogFormProps) {
  const { isPending, message, submit } = useLogSubmission(plan);

  return (
    <form
      action={submit}
      className='border border-border bg-background p-8'
    >
      <div className='grid gap-6 lg:grid-cols-2'>
        <label className='space-y-3'>
          <span className='text-sm uppercase tracking-[0.25em] text-muted-foreground'>Today</span>
          <select
            name='scheduleItemId'
            className='flex h-12 w-full rounded-none border border-border bg-secondary/20 px-4 text-sm outline-none'
            required
          >
            {scheduleItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label} · {item.date}
              </option>
            ))}
          </select>
        </label>

        <label className='space-y-3'>
          <span className='text-sm uppercase tracking-[0.25em] text-muted-foreground'>Nestuge URL</span>
          <Input
            name='nestugeUrl'
            type='url'
            placeholder='https://nestuge.com/...'
            required
            className='h-12 rounded-none border-border bg-secondary/20'
          />
        </label>
      </div>

      <div className='mt-6 grid gap-6 lg:grid-cols-2'>
        <label className='space-y-3'>
          <span className='text-sm uppercase tracking-[0.25em] text-muted-foreground'>Key Insight</span>
          <Textarea name='keyInsight' required className='min-h-36 rounded-none border-border bg-secondary/20' />
        </label>

        <label className='space-y-3'>
          <span className='text-sm uppercase tracking-[0.25em] text-muted-foreground'>Action Taken</span>
          <Textarea name='actionTaken' required className='min-h-36 rounded-none border-border bg-secondary/20' />
        </label>
      </div>

      <label className='mt-6 block space-y-3'>
        <span className='text-sm uppercase tracking-[0.25em] text-muted-foreground'>Reflection Summary</span>
        <Textarea
          name='reflectionSummary'
          className='min-h-28 rounded-none border-border bg-secondary/20'
          placeholder='Optional backup reflection for future internal journaling.'
        />
      </label>

      <div className='mt-8 flex flex-wrap items-center gap-4'>
        <Button
          type='submit'
          disabled={isPending}
          className='h-12 rounded-none bg-primary px-6 text-primary-foreground hover:bg-primary/90'
        >
          {isPending ? <LoaderCircle className='size-4 animate-spin' /> : null}
          Save Proof
        </Button>
        {message ? <p className='text-sm text-muted-foreground'>{message}</p> : null}
      </div>
    </form>
  );
}
