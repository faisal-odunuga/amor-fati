import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ScheduleItem } from '@/lib/book-club/types';

export function TodayFocusCard({ item }: { item: ScheduleItem }) {
  return (
    <section className='border border-border bg-secondary/20 p-8'>
      <div className='flex items-center gap-3 text-primary'>
        <CalendarDays className='size-4' />
        <p className='text-xs uppercase tracking-[0.3em]'>Today&apos;s Task</p>
      </div>

      <h3 className='mt-6 font-serif text-4xl text-foreground'>{item.label}</h3>
      <p className='mt-4 max-w-2xl text-base leading-7 text-muted-foreground'>{item.description}</p>

      <div className='mt-8 flex flex-wrap items-center gap-3'>
        <div className='border border-primary/20 bg-background px-4 py-2 text-sm uppercase tracking-[0.25em] text-muted-foreground'>
          {item.type}
        </div>
        <div className='border border-primary/20 bg-background px-4 py-2 text-sm uppercase tracking-[0.25em] text-muted-foreground'>
          Weight {item.weight}
        </div>
      </div>

      <Button asChild className='mt-8 rounded-none bg-primary text-primary-foreground hover:bg-primary/90'>
        <Link href='/log'>
          Log Progress
          <ArrowRight className='size-4' />
        </Link>
      </Button>
    </section>
  );
}
