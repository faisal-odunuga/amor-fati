'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center'>
      <div className='mb-12'>
        <div className='size-24 rounded-full border border-red-500/20 flex items-center justify-center bg-red-500/5 mx-auto'>
          <AlertTriangle className='size-12 text-red-500/50' />
        </div>
      </div>
      
      <p className='text-xs font-bold uppercase tracking-[0.4em] text-red-500 mb-4'>System Encountered an Impediment</p>
      <h1 className='font-serif text-5xl text-foreground mb-6 italic'>Something went wrong</h1>
      
      <div className='max-w-md mx-auto'>
        <p className='text-muted-foreground text-sm mb-10 leading-relaxed bg-secondary/20 p-4 border border-border italic'>
          "{error.message || 'An unexpected error occurred while processing your request.'}"
          {error.digest && <span className='block mt-2 opacity-50 text-[10px] uppercase tracking-widest font-sans'>Ref: {error.digest}</span>}
        </p>
      </div>
      
      <div className='flex flex-col sm:flex-row gap-4'>
        <Button 
          onClick={() => reset()}
          className='h-12 px-8 rounded-none bg-primary text-primary-foreground hover:opacity-90'
        >
          <RefreshCcw className='mr-2 size-4' /> Attempt Recovery
        </Button>
        <Button asChild variant='outline' className='h-12 px-8 rounded-none border-border hover:bg-secondary/50'>
          <Link href='/'>
            <Home className='mr-2 size-4' /> Return Home
          </Link>
        </Button>
      </div>
      
      <div className='mt-12 text-[10px] uppercase tracking-[0.5em] text-muted-foreground/30'>
        Amor Fati · Critical Fault Handler
      </div>
    </div>
  );
}
