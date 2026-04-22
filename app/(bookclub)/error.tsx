'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft, RefreshCcw } from 'lucide-react';

export default function BookClubError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const isUnauthorized = error.message.includes('Unauthorized');
  const isForbidden = error.message.includes('Forbidden');
  const redirectHref = isUnauthorized ? '/login' : '/';

  useEffect(() => {
    if (isUnauthorized || isForbidden) {
      const timer = setInterval(() => {
        setCountdown((prev) => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isUnauthorized, isForbidden]);

  useEffect(() => {
    if ((isUnauthorized || isForbidden) && countdown === 0) {
      router.push(redirectHref);
    }
  }, [countdown, isUnauthorized, isForbidden, redirectHref, router]);

  return (
    <div className='flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center'>
      {/* Premium Background Elements */}
      <div className='fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_70%)]' />
      <div className='fixed inset-0 -z-10 opacity-[0.03] [background-image:url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")]' />

      <div className='relative'>
        <div className='absolute -inset-4 rounded-full bg-primary/10 blur-2xl animate-pulse' />
        <AlertCircle className='relative size-16 text-primary' />
      </div>

      <h1 className='mt-8 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
        {isUnauthorized ? 'Identity Required' : isForbidden ? 'Access Denied' : 'System Interruption'}
      </h1>

      <p className='mt-4 max-w-lg text-lg text-muted-foreground'>
        {isUnauthorized
          ? "You need to be signed in to access the member platform. We're getting you there now."
          : isForbidden
            ? "Your account doesn't have the required clearance for this section."
            : error.message || 'An unexpected error occurred while processing your request.'}
      </p>

      {(isUnauthorized || isForbidden) && (
        <p className='mt-6 text-xs font-bold uppercase tracking-[0.3em] text-primary/60'>
          Redirecting in {countdown}s...
        </p>
      )}

      <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
        {isUnauthorized ? (
          <Button
            size='lg'
            onClick={() => router.push(redirectHref)}
            className='rounded-none px-8 font-bold uppercase tracking-widest'
          >
            Login Now
          </Button>
        ) : isForbidden ? (
          <Button
            variant='outline'
            size='lg'
            onClick={() => router.push(redirectHref)}
            className='rounded-none px-8 font-bold uppercase tracking-widest border-primary/20 hover:bg-primary/5'
          >
            <ArrowLeft className='mr-2 size-4' />
            Return Home
          </Button>
        ) : (
          <>
            <Button
              size='lg'
              onClick={() => reset()}
              className='rounded-none px-8 font-bold uppercase tracking-widest'
            >
              <RefreshCcw className='mr-2 size-4' />
              Try Again
            </Button>
            <Button
              variant='outline'
              size='lg'
              onClick={() => router.push('/')}
              className='rounded-none px-8 font-bold uppercase tracking-widest border-primary/20 hover:bg-primary/5'
            >
              Return Home
            </Button>
          </>
        )}
      </div>

      {error.digest && (
        <p className='mt-12 text-[10px] uppercase tracking-widest text-muted-foreground/40'>
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
