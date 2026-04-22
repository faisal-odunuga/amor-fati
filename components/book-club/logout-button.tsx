'use client';

import { LogOut, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/use-logout';

export function LogoutButton() {
  const { isPending, logout } = useLogout();

  return (
    <Button
      type='button'
      variant='outline'
      onClick={logout}
      disabled={isPending}
      className='rounded-none border-primary/30 bg-primary/5'
    >
      {isPending ? <LoaderCircle className='size-4 animate-spin' /> : <LogOut className='size-4' />}
      Logout
    </Button>
  );
}
