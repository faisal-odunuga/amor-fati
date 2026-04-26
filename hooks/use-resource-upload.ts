'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useResourceUpload() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/admin/resources/upload', {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || payload.message || 'Upload failed.');
      }

      return payload;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Resource uploaded successfully.');
      queryClient.invalidateQueries({ queryKey: ['resources'] });
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
