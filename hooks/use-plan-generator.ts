'use client';

import { useMemo, useState } from 'react';
import type { ScheduleDraftItem } from '@/lib/book-club/types';

export function usePlanGenerator() {
  const [items, setItems] = useState<ScheduleDraftItem[]>([]);
  const [title, setTitle] = useState('New Monthly Plan');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const monthDate = useMemo(() => items[0]?.date ?? '', [items]);

  async function generateDraft(formData: FormData) {
    setIsLoading(true);
    setMessage(null);

    const response = await fetch('/api/admin/plans/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formData.get('title'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        chapters: String(formData.get('chapters') || '')
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
      }),
    });

    const payload = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setMessage(payload.error ?? 'Could not generate draft.');
      return;
    }

    setItems(payload.items);
    setMessage('Draft generated. Review before saving.');
  }

  async function saveDraft() {
    const response = await fetch('/api/admin/plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        monthDate,
        items,
      }),
    });

    const payload = await response.json();
    setMessage(payload.message ?? (response.ok ? 'Plan saved.' : 'Failed to save plan.'));
  }

  function updateItem(index: number, patch: Partial<ScheduleDraftItem>) {
    setItems((current) =>
      current.map((item, currentIndex) => (currentIndex === index ? { ...item, ...patch } : item))
    );
  }

  function moveItem(index: number, direction: -1 | 1) {
    setItems((current) => {
      const nextIndex = index + direction;

      if (nextIndex < 0 || nextIndex >= current.length) {
        return current;
      }

      const reordered = [...current];
      const [item] = reordered.splice(index, 1);
      reordered.splice(nextIndex, 0, item);
      return reordered.map((entry, itemIndex) => ({ ...entry, dayIndex: itemIndex + 1 }));
    });
  }

  return {
    items,
    title,
    isLoading,
    message,
    setTitle,
    generateDraft,
    saveDraft,
    updateItem,
    moveItem,
  };
}
