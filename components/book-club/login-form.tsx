'use client';

import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/hooks/use-login';

export function LoginForm() {
  const { isPending, message, submit } = useLogin();

  return (
    <form action={submit} className='border border-border bg-background p-8'>
      <p className='text-xs font-bold uppercase tracking-[0.3em] text-primary'>Access</p>
      <h1 className='mt-4 font-serif text-4xl text-foreground'>Enter the platform</h1>
      <p className='mt-4 max-w-xl text-sm leading-6 text-black/65'>
        Members and admins authenticate through Supabase Auth. Roles and subscription status gate
        what each tenant can access.
      </p>

      <label className='mt-8 block space-y-3'>
        <span className='text-sm uppercase tracking-[0.25em] text-muted-foreground'>Email</span>
        <Input
          name='email'
          type='email'
          required
          className='h-12 rounded-none border-border bg-secondary/20'
        />
      </label>

      <label className='mt-8 block space-y-3'>
        <span className='text-sm uppercase tracking-[0.25em] text-muted-foreground'>Password</span>
        <Input
          name='password'
          type='password'
          required
          className='h-12 rounded-none border-border bg-secondary/20'
        />
      </label>

      <Button
        type='submit'
        disabled={isPending}
        className='mt-8 h-12 rounded-none bg-primary px-6 text-primary-foreground hover:bg-primary/90'
      >
        {isPending ? <LoaderCircle className='size-4 animate-spin' /> : null}
        Login
      </Button>

      {message ? <p className='mt-4 text-sm text-muted-foreground'>{message}</p> : null}
    </form>
  );
}
