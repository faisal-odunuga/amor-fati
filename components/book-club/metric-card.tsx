import { cn } from '@/utils';

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  tone?: 'default' | 'gold';
};

export function MetricCard({ label, value, detail, tone = 'default' }: MetricCardProps) {
  return (
    <div
      className={cn(
        'border p-6',
        tone === 'gold'
          ? 'border-primary/30 bg-primary/5'
          : 'border-border bg-secondary/20'
      )}
    >
      <p className='text-xs font-bold uppercase tracking-[0.3em] text-primary'>{label}</p>
      <p className='mt-5 font-serif text-4xl text-foreground'>{value}</p>
      <p className='mt-3 text-sm leading-6 text-muted-foreground'>{detail}</p>
    </div>
  );
}
