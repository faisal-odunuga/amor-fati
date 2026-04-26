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
        'group relative overflow-hidden p-5 transition-all duration-500 rounded-none border border-black/10 sm:p-8',
        tone === 'gold'
          ? 'bg-gradient-to-br from-[#d9a517]/5 to-[#b88c12]/10 shadow-[0_20px_50px_rgba(217,165,23,0.08)]'
          : 'bg-white hover:bg-[#faf7f1] shadow-[0_15px_40px_rgba(0,0,0,0.04)]'
      )}
    >
      {/* Decorative Accent */}
      <div className={cn(
        'absolute top-0 right-0 h-1 w-8 transition-all duration-500 group-hover:w-full sm:w-12',
        tone === 'gold' ? 'bg-[#d9a517]' : 'bg-black/10 group-hover:bg-[#d9a517]'
      )} />

      <p className='text-[9px] font-bold uppercase tracking-[0.4em] text-black/40 sm:text-[10px]'>{label}</p>
      
      <div className='mt-4 flex items-baseline gap-2 sm:mt-8'>
        <p className='font-serif text-3xl font-bold tracking-tight text-black sm:text-6xl'>
          {value}
        </p>
      </div>

      <p className='mt-2 max-w-[200px] text-[10px] leading-relaxed tracking-wide text-black/50 sm:mt-4 sm:text-xs sm:leading-5'>
        {detail}
      </p>

      {/* Background Glow for Gold Tone */}
      {tone === 'gold' && (
        <div className='absolute -bottom-10 -right-10 size-24 rounded-full bg-[#d9a517]/10 blur-3xl transition-opacity group-hover:opacity-100 sm:size-32' />
      )}
    </div>
  );
}
