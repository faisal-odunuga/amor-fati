'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useResourceUpload() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit(formData: FormData) {
    setIsPending(true);
    setMessage(null);

    const response = await fetch('/api/admin/resources/upload', {
      method: 'POST',
      body: formData,
    });

    const payload = await response.json();
    setIsPending(false);
    setMessage(payload.message ?? (response.ok ? 'Resource uploaded.' : 'Upload failed.'));

    if (response.ok) {
      router.refresh();
    }
  }

  return {
    isPending,
    message,
    submit,
  };
}
