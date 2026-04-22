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
        'border border-border bg-background p-7',
        percentage >= 25 ? 'ring-1 ring-primary/10' : '',
        percentage >= 50 ? 'bg-primary/[0.04]' : '',
        percentage >= 100 ? 'animate-pulse' : ''
      )}
    >
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.3em] text-primary'>Weighted Progress</p>
          <h3 className='mt-3 font-serif text-3xl text-foreground'>{percentage.toFixed(0)}%</h3>
        </div>
        <div className='border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-foreground'>
          {milestone}
        </div>
      </div>

      <Progress value={percentage} className='mt-8 h-3 bg-secondary [&_[data-slot=progress-indicator]]:bg-primary' />

      <div className='mt-6 flex items-center justify-between gap-3 text-sm text-muted-foreground'>
        <span>{completedLabel}</span>
        {percentage >= 100 ? (
          <span className='inline-flex items-center gap-2 text-foreground'>
            <Sparkles className='size-4 text-primary' />
            You executed.
          </span>
        ) : null}
      </div>
    </section>
  );
}
