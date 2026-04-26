'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

export function useLogin(redirectPath: string = '/bookclub/dashboard', requiredRole?: 'member' | 'admin') {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        throw new Error('Add Supabase environment variables to enable auth.');
      }

      const supabase = createClient();
      const email = String(formData.get('email') || '');
      const password = String(formData.get('password') || '');

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (requiredRole && authData.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (requiredRole === 'admin' && profile?.role !== 'admin') {
          await supabase.auth.signOut();
          throw new Error('This account does not have administrator privileges.');
        }

        if (requiredRole === 'member' && profile?.role !== 'member' && profile?.role !== 'admin') {
          await supabase.auth.signOut();
          throw new Error('This account does not have member privileges.');
        }
      }

      return true;
    },
    onSuccess: () => {
      toast.success('Identity verified. Access granted.');
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
