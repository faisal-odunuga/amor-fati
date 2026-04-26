import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ScheduleItem } from '@/lib/book-club/types';

export function TodayFocusCard({ item }: { item: ScheduleItem }) {
  return (
    <section className='rounded-xl border border-black/10 bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.06)] sm:p-8'>
      <div className='flex items-center gap-3 text-[#d9a517]'>
        <CalendarDays className='size-4' />
        <p className='text-[10px] font-bold uppercase tracking-[0.3em]'>Today&apos;s Focus</p>
      </div>

      <h3 className='mt-6 font-serif text-3xl text-black sm:text-4xl lg:text-5xl'>{item.label}</h3>
      <p className='mt-4 max-w-2xl text-sm leading-7 text-black/65 sm:text-base'>{item.description}</p>

      <div className='mt-8 flex flex-wrap items-center gap-3'>
        <div className='border border-black/10 bg-[#faf7f1] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>
          {item.type}
        </div>
        <div className='border border-black/10 bg-[#faf7f1] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>
          Weight {item.weight}
        </div>
      </div>

      <Button asChild className='mt-8 h-12 rounded-none bg-black px-8 font-bold uppercase tracking-widest text-white hover:bg-black/80 w-full sm:w-auto'>
        <Link href='/bookclub/log'>
          Submit Proof
          <ArrowRight className='size-4 ml-2' />
        </Link>
      </Button>
    </section>
  );
}
