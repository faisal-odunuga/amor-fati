import { LoaderCircle } from 'lucide-react';

export default function BookClubLoading() {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center text-center'>
      <div className='relative'>
        <div className='size-16 rounded-full border border-primary/10 flex items-center justify-center bg-secondary/20'>
          <LoaderCircle className='size-8 animate-spin text-primary' strokeWidth={1.5} />
        </div>
      </div>
      <div className='mt-6'>
        <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-primary'>Member Platform</p>
        <p className='mt-2 text-sm text-muted-foreground italic'>Preparing your daily focus...</p>
      </div>
    </div>
  );
}
