'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShieldAlert, ArrowLeft, RefreshCcw } from 'lucide-react';

export default function AdminError({
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
      <div className='fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(220,100,50,0.05),transparent_70%)]' />
      <div className='fixed inset-0 -z-10 opacity-[0.03] [background-image:url("https://www.transparenttextures.com/patterns/carbon-fibre.png")]' />

      <div className='relative'>
        <div className='absolute -inset-4 rounded-full bg-red-500/10 blur-2xl animate-pulse' />
        <ShieldAlert className='relative size-16 text-red-500' />
      </div>

      <h1 className='mt-8 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
        {isUnauthorized ? 'Authentication Failed' : isForbidden ? 'Insufficient Privileges' : 'System Critical Error'}
      </h1>

      <p className='mt-4 max-w-lg text-lg text-muted-foreground'>
        {isUnauthorized
          ? "Admin access requires an active session. Redirecting to the secure login gateway."
          : isForbidden
            ? "Your account does not have administrator privileges. Only operators can access this area."
            : error.message || 'The administrative system encountered an unexpected fault.'}
      </p>

      {(isUnauthorized || isForbidden) && (
        <p className='mt-6 text-xs font-bold uppercase tracking-[0.3em] text-red-500/60'>
          Redirecting in {countdown}s...
        </p>
      )}

      <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
        {isUnauthorized ? (
          <Button
            size='lg'
            onClick={() => router.push(redirectHref)}
            className='rounded-none bg-red-600 px-8 font-bold uppercase tracking-widest hover:bg-red-700'
          >
            Login as Admin
          </Button>
        ) : isForbidden ? (
          <Button
            variant='outline'
            size='lg'
            onClick={() => router.push(redirectHref)}
            className='rounded-none px-8 font-bold uppercase tracking-widest border-red-500/20 hover:bg-red-500/5'
          >
            <ArrowLeft className='mr-2 size-4' />
            Exit Admin Area
          </Button>
        ) : (
          <>
            <Button
              size='lg'
              onClick={() => reset()}
              className='rounded-none bg-red-600 px-8 font-bold uppercase tracking-widest hover:bg-red-700'
            >
              <RefreshCcw className='mr-2 size-4' />
              Reset System
            </Button>
            <Button
              variant='outline'
              size='lg'
              onClick={() => router.push('/')}
              className='rounded-none px-8 font-bold uppercase tracking-widest border-red-500/20 hover:bg-red-500/5'
            >
              Return Home
            </Button>
          </>
        )}
      </div>

      {error.digest && (
        <p className='mt-12 text-[10px] uppercase tracking-widest text-muted-foreground/40'>
          Trace ID: {error.digest}
        </p>
      )}
    </div>
  );
}
