'use client';

import { useMemo, useState } from 'react';
import type { ScheduleDraftItem } from '@/lib/book-club/types';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePlanGenerator() {
  const [items, setItems] = useState<ScheduleDraftItem[]>([]);
  const [title, setTitle] = useState('New Monthly Plan');
  const queryClient = useQueryClient();

  const monthDate = useMemo(() => items[0]?.date ?? '', [items]);

  const generateDraftMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/admin/plans/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.get('title'),
          startDate: formData.get('startDate'),
          endDate: formData.get('endDate'),
          bookId: formData.get('bookId'),
          mode: formData.get('mode'),
          input: formData.get('input'),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? 'Could not generate draft.');
      }
      return payload.items as ScheduleDraftItem[];
    },
    onSuccess: (data) => {
      setItems(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const saveDraftMutation = useMutation({
    mutationFn: async () => {
      if (!items.length) return;
      
      const response = await fetch('/api/admin/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          items,
          bookId: items[0].book_id,
          monthDate: items[0].date,
        }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error ?? 'Could not save plan.');
      }
    },
    onSuccess: () => {
      toast.success('Plan successfully saved.');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      queryClient.invalidateQueries({ queryKey: ['active-plan'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
    isLoading: generateDraftMutation.isPending,
    isSaving: saveDraftMutation.isPending,
    setTitle,
    generateDraft: generateDraftMutation.mutate,
    saveDraft: saveDraftMutation.mutate,
    updateItem,
    moveItem,
  };
}
