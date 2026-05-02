'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useBookUpload() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/admin/books/upload', {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || payload.message || 'Book upload failed.');
      }

      return payload;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Book uploaded successfully.');
      queryClient.invalidateQueries({ queryKey: ['books'] });
      router.refresh();
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
