'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useLogout() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      return true;
    },
    onSuccess: () => {
      router.push('/login');
      router.refresh();
      toast.success('Successfully logged out.');
    },
    onError: (error) => {
      toast.error(error.message || 'Unable to log out.');
    },
  });

  return {
    isPending: mutation.isPending,
    logout: () => mutation.mutate(),
  };
}
