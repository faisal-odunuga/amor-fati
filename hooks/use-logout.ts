'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function useLogout() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function logout() {
    setIsPending(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsPending(false);
    router.push('/login');
    router.refresh();
  }

  return {
    isPending,
    logout,
  };
}
