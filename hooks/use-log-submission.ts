'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ReadingPlan } from '@/lib/book-club/types';

export function useLogSubmission(plan: ReadingPlan) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit(formData: FormData) {
    setIsPending(true);
    setMessage(null);

    const response = await fetch('/api/member/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scheduleItemId: formData.get('scheduleItemId'),
        planId: plan.id,
        nestugeUrl: formData.get('nestugeUrl'),
        reflectionSummary: formData.get('reflectionSummary'),
        keyInsight: formData.get('keyInsight'),
        actionTaken: formData.get('actionTaken'),
      }),
    });

    const payload = await response.json();
    setIsPending(false);
    console.log(payload);
    setMessage(payload.message ?? (response.ok ? 'Log saved.' : 'Unable to save log.'));

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
