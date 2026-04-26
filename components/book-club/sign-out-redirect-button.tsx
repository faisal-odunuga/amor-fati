'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

export function SignOutRedirectButton({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async () => {
    setIsPending(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push('/login');
  };

  return (
    <Button
      onClick={handleSignOut}
      disabled={isPending}
      className={className}
    >
      {isPending && <LoaderCircle className='size-4 animate-spin mr-2' />}
      {children}
    </Button>
  );
}
