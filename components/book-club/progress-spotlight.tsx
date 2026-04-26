import { Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/utils';

type ProgressSpotlightProps = {
  percentage: number;
  completedLabel: string;
  milestone: string;
};

export function ProgressSpotlight({
  percentage,
  completedLabel,
  milestone,
}: ProgressSpotlightProps) {
  return (
    <section
      className={cn(
        'rounded-xl border border-black/10 bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.06)] sm:p-8 transition-all duration-500',
        percentage >= 50 ? 'bg-[#faf7f1]' : ''
      )}
    >
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517]'>Weighted Progress</p>
          <h3 className='mt-3 font-serif text-3xl text-black sm:text-4xl'>{percentage.toFixed(0)}%</h3>
        </div>
        <div className='border border-black/10 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black/45'>
          {milestone}
        </div>
      </div>

      <Progress 
        value={percentage} 
        className='mt-8 h-3 bg-black/5 [&_[data-slot=progress-indicator]]:bg-[#d9a517]' 
      />

      <div className='mt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-black/40'>
        <span>{completedLabel}</span>
        {percentage >= 100 ? (
          <span className='inline-flex items-center gap-2 text-[#d9a517]'>
            <Sparkles className='size-3' />
            Execution Verified
          </span>
        ) : null}
      </div>
    </section>
  );
}
