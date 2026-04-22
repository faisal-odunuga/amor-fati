'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground'>
      <div className='max-w-md'>
        <div className='mb-8 flex justify-center'>
          <AlertCircle className='size-12 text-primary' />
        </div>
        
        <h1 className='font-serif text-3xl font-bold sm:text-4xl'>Something went wrong</h1>
        <p className='mt-4 text-muted-foreground'>
          An unexpected error occurred. Our team has been notified.
        </p>
        
        <div className='mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button 
            onClick={() => reset()} 
            className='rounded-none px-8 font-bold uppercase tracking-widest'
          >
            <RefreshCcw className='mr-2 size-4' />
            Try again
          </Button>
          <Button 
            asChild 
            variant='outline' 
            className='rounded-none px-8 font-bold uppercase tracking-widest'
          >
            <Link href='/'>
              <ArrowLeft className='mr-2 size-4' />
              Go home
            </Link>
          </Button>
        </div>

        {error.digest && (
          <p className='mt-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/30'>
            Reference ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
