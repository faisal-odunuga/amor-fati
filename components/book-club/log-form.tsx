'use client';

import { LoaderCircle } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ReadingPlan, ScheduleItem } from '@/lib/book-club/types';
import { useLogSubmission } from '@/hooks/use-log-submission';
import { format, parseISO } from 'date-fns';

type LogFormProps = {
  plan: ReadingPlan;
  scheduleItems: ScheduleItem[];
};

export function LogForm({ plan, scheduleItems }: LogFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { isPending, submit, isSuccess } = useLogSubmission(plan);

  const today = new Date().toISOString().split('T')[0];
  const defaultItem = scheduleItems.find(item => item.date.startsWith(today));

  return (
    <form
      ref={formRef}
      action={(formData) => {
        submit(formData, {
          onSuccess: () => {
            formRef.current?.reset();
          }
        });
      }}
      className='border border-border bg-background p-4 sm:p-6 lg:p-8'
    >
      <div className='grid gap-6 lg:grid-cols-2'>
        <label className='space-y-3'>
          <span className='text-sm uppercase tracking-[0.25em] text-muted-foreground'>Schedule Item</span>
          <select
            name='scheduleItemId'
            className='flex h-12 w-full rounded-none border border-border bg-secondary/20 px-4 text-sm outline-none'
            required
            defaultValue={defaultItem?.id}
          >
            {scheduleItems.map((item) => (
              <option key={item.id} value={item.id}>
                {format(parseISO(item.date), 'EEE dd, MMM')}({item.label})
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

      <label className='mt-6 block space-y-3'>
        <span className='text-sm uppercase tracking-[0.25em] text-muted-foreground'>Description (Optional)</span>
        <Textarea
          name='desc'
          placeholder='How did it go? What was your key takeaway?'
          className='min-h-24 rounded-none border-border bg-secondary/20'
        />
      </label>

      <div className='mt-8 flex flex-wrap items-center gap-4'>
        <Button
          type='submit'
          disabled={isPending}
          className='h-12 rounded-none bg-primary px-6 text-primary-foreground hover:bg-primary/90'
        >
          {isPending ? <LoaderCircle className='size-4 animate-spin mr-2' /> : null}
          Save Proof
        </Button>
      </div>
    </form>
  );
}
