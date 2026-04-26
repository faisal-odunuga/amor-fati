import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-background z-50'>
      <div className='relative flex flex-col items-center'>
        <div className='size-24 rounded-full border-2 border-primary/10 flex items-center justify-center'>
          <LoaderCircle className='size-12 animate-spin text-primary' strokeWidth={1.5} />
        </div>
        <div className='mt-8 text-center'>
          <p className='text-[10px] font-bold uppercase tracking-[0.4em] text-primary'>Amor Fati</p>
          <h2 className='mt-2 font-serif text-2xl text-foreground italic'>Loading your journey...</h2>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse' />
      <div className='absolute bottom-0 right-0 p-12 opacity-5'>
        <h1 className='text-[15rem] font-serif leading-none select-none'>AF</h1>
      </div>
    </div>
  );
}
