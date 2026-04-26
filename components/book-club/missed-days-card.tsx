import { AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ScheduleItem } from '@/lib/book-club/types';

export function MissedDaysCard({ missedItems }: { missedItems: ScheduleItem[] }) {
  if (missedItems.length === 0) return null;

  return (
    <div className='border border-red-900/30 bg-red-950/10 p-6'>
      <div className='flex items-center gap-3'>
        <AlertTriangle className='size-5 text-red-500' />
        <h3 className='font-serif text-xl text-red-500'>Accountability Debt</h3>
      </div>
      <p className='mt-2 text-sm text-red-900/70 dark:text-red-200/60'>
        You have unlogged items from past dates. Consistency requires clearing your backlog.
      </p>

      <div className='mt-6 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-red-900/10 scrollbar-track-transparent'>
        <div className='space-y-3'>
          {missedItems.map((item) => (
            <div key={item.id} className='group flex items-center justify-between border-b border-red-900/10 pb-3 last:border-0 last:pb-0'>
              <div>
                <p className='text-sm font-medium text-black dark:text-white group-hover:text-red-600 transition-colors'>{item.label}</p>
                <p className='text-[10px] uppercase tracking-widest text-muted-foreground mt-1'>{item.date}</p>
              </div>
              <Link
                href={`/bookclub/log?item=${item.id}`}
                className='shrink-0 flex items-center gap-1.5 px-3 py-1.5 border border-red-600/20 text-[10px] font-bold uppercase tracking-widest text-red-600 hover:bg-red-600 hover:text-white transition-all'
              >
                Clear Debt <ArrowRight className='size-3' />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
