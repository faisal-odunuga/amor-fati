'use client';

import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/hooks/use-login';

export function LoginForm({ redirectPath }: { redirectPath?: string }) {
  const { isPending, submit } = useLogin(redirectPath);

  return (
    <div className='rounded-xl border border-black/10 bg-white p-8 shadow-[0_25px_70px_rgba(0,0,0,0.06)] sm:p-12'>
      <div className='mb-8'>
        <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517]'>Authentication</p>
        <h1 className='mt-3 font-serif text-4xl text-black'>Sign In</h1>
        <p className='mt-3 text-sm leading-relaxed text-black/65'>
          Access your personalized reading cadence and accountability tools.
        </p>
      </div>

      <form action={submit} className='space-y-6'>
        <label className='block'>
          <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>Registered Email</span>
          <Input
            name='email'
            type='email'
            required
            placeholder='name@example.com'
            className='h-12 rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20'
          />
        </label>

        <label className='block'>
          <span className='mb-2.5 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45'>Password</span>
          <Input
            name='password'
            type='password'
            required
            placeholder='••••••••'
            className='h-12 rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20'
          />
        </label>

        <div className='pt-4'>
          <Button
            type='submit'
            disabled={isPending}
            className='h-12 w-full rounded-none bg-black px-8 font-bold uppercase tracking-widest text-white hover:bg-black/80'
          >
            {isPending ? <LoaderCircle className='size-4 animate-spin mr-2' /> : null}
            Authenticate →
          </Button>
        </div>
      </form>
      
      <p className='mt-10 text-center text-[10px] font-bold uppercase tracking-widest text-black/40'>
        Protected by Amor Fati Security
      </p>
    </div>
  );
}
