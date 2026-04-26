import { Flame } from 'lucide-react';

export function StreakBadge({
  streak,
  longest,
}: {
  streak: number;
  longest: number;
}) {
  return (
    <div className='inline-flex items-center gap-4 border border-black/10 bg-white p-3 pr-6 shadow-sm'>
      <div className='flex size-10 shrink-0 items-center justify-center border border-[#d9a517]/30 bg-[#d9a517]/5 text-[#d9a517]'>
        <Flame className='size-5 fill-[#d9a517]/20' />
      </div>
      <div className='whitespace-nowrap'>
        <p className='font-serif text-xl leading-none text-black'>{streak} Day Streak</p>
        <p className='mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#d9a517]'>Personal best: {longest}d</p>
      </div>
    </div>
  );
}
