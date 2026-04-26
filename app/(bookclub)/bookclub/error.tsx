'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function BookClubError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isForbidden = error.message === 'Forbidden';

  return (
    <div className='min-h-screen bg-[#faf7f1] flex items-center justify-center p-6'>
      <div className='max-w-md w-full text-center'>
        <div className='flex justify-center mb-8'>
          <div className='size-20 rounded-full bg-[#d9a517]/5 flex items-center justify-center'>
            <Lock className='size-10 text-[#d9a517]' />
          </div>
        </div>
        
        <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517] mb-4'>
          {isForbidden ? 'Membership Required' : 'Session Interrupted'}
        </p>
        
        <h1 className='font-serif text-4xl text-black mb-6'>
          {isForbidden 
            ? 'Member Access Only' 
            : 'Something went wrong'}
        </h1>
        
        <p className='text-sm text-black/65 leading-relaxed mb-10'>
          {isForbidden 
            ? 'This area is reserved for active members of the Amor Fati Book Club. If you recently joined, please wait for your account to be activated.' 
            : 'The connection to your reading cadence was interrupted. Please try refreshing the page.'}
        </p>
        
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Button
            onClick={() => reset()}
            className='w-full sm:w-auto h-12 rounded-none bg-black px-8 font-bold uppercase tracking-widest text-white hover:bg-black/80'
          >
            Reconnect
          </Button>
          <Button
            asChild
            variant='outline'
            className='w-full sm:w-auto h-12 rounded-none border-black/10 bg-white px-8 font-bold uppercase tracking-widest text-black hover:bg-[#faf7f1]'
          >
            <Link href='/bookclub/login'>Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
