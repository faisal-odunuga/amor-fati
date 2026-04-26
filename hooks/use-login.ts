'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

export function useLogin(redirectPath: string = '/bookclub/dashboard') {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        throw new Error('Add Supabase environment variables to enable auth.');
      }

      const supabase = createClient();
      const email = String(formData.get('email') || '');
      const password = String(formData.get('password') || '');

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return true;
    },
    onSuccess: () => {
      toast.success('Successfully logged in.');
      router.refresh();
      router.push(redirectPath);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    isPending: mutation.isPending,
    submit: mutation.mutate,
  };
}
