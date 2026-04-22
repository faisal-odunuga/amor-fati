import { Flame } from 'lucide-react';

export function StreakBadge({
  streak,
  longest,
}: {
  streak: number;
  longest: number;
}) {
  return (
    <div className='inline-flex items-center gap-3 border border-primary/30 bg-primary/5 px-5 py-3 text-foreground'>
      <div className='flex size-9 items-center justify-center border border-primary/20 bg-primary/10 text-primary'>
        <Flame className='size-4' />
      </div>
      <div>
        <p className='text-sm'>{streak} Day Consistency</p>
        <p className='text-xs uppercase tracking-[0.25em] text-muted-foreground'>Best {longest} days</p>
      </div>
    </div>
  );
}
