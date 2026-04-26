'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { ReadingPlan } from '@/lib/book-club/types';
import { toast } from 'sonner';

export function useLogSubmission(plan: ReadingPlan) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/member/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scheduleItemId: formData.get('scheduleItemId'),
          planId: plan.id,
          nestugeUrl: formData.get('nestugeUrl'),
          desc: formData.get('desc') || undefined,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to save log.');
      }

      return payload;
    },
    onSuccess: () => {
      toast.success('Log successfully saved.');
      queryClient.invalidateQueries({ queryKey: ['logs'] });
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || 'Unable to save log.');
    }
  });

  return {
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    submit: mutation.mutate,
    isSuccess: mutation.isSuccess,
  };
}
