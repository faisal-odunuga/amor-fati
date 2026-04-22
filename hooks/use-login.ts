'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function useLogin() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit(formData: FormData) {
    setIsPending(true);
    setMessage(null);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setMessage('Add Supabase environment variables to enable auth.');
      setIsPending(false);
      return;
    }

    const supabase = createClient();
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsPending(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    // setMessage('Magic link sent. Check your inbox.');
    router.refresh();
    router.push('/dashboard');
  }

  return {
    isPending,
    message,
    submit,
  };
}
