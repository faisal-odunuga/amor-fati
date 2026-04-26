'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function AdminError({
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
          <div className='size-20 rounded-full bg-red-50 flex items-center justify-center'>
            <ShieldAlert className='size-10 text-red-600' />
          </div>
        </div>
        
        <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-red-600 mb-4'>
          {isForbidden ? 'Access Denied' : 'System Error'}
        </p>
        
        <h1 className='font-serif text-4xl text-black mb-6'>
          {isForbidden 
            ? 'Administrator Privileges Required' 
            : 'Something went wrong'}
        </h1>
        
        <p className='text-sm text-black/65 leading-relaxed mb-10'>
          {isForbidden 
            ? 'Your account does not have the necessary permissions to access the operator control room. If you believe this is an error, contact technical support.' 
            : 'The application encountered an unexpected error. Our systems have been notified and we are investigating.'}
        </p>
        
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Button
            onClick={() => reset()}
            className='w-full sm:w-auto h-12 rounded-none bg-black px-8 font-bold uppercase tracking-widest text-white hover:bg-black/80'
          >
            Try Again
          </Button>
          <Button
            asChild
            variant='outline'
            className='w-full sm:w-auto h-12 rounded-none border-black/10 bg-white px-8 font-bold uppercase tracking-widest text-black hover:bg-[#faf7f1]'
          >
            <Link href='/'>Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
