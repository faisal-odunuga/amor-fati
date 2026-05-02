'use client';

import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AdminPlanPreviewTable } from '@/components/book-club/admin-plan-preview-table';
import type { AdminEditablePlan, ScheduleDraftItem } from '@/lib/book-club/types';

function deriveMonthDate(items: ScheduleDraftItem[], fallback: string) {
  return items[0]?.date ?? fallback;
}

export function AdminPlansManager({ initialPlans }: { initialPlans: AdminEditablePlan[] }) {
  const [plans, setPlans] = useState(initialPlans);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (input: { planId: string; title: string; monthDate: string; items: ScheduleDraftItem[] }) => {
      const response = await fetch(`/api/admin/plans/${input.planId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: input.title,
          monthDate: input.monthDate,
          items: input.items,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? 'Could not update plan.');
      }
    },
    onSuccess: () => {
      toast.success('Plan updated.');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (planId: string) => {
      const response = await fetch(`/api/admin/plans/${planId}`, {
        method: 'DELETE',
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? 'Could not delete plan.');
      }
    },
    onSuccess: (_, planId) => {
      setPlans((current) => current.filter((plan) => plan.id !== planId));
      toast.success('Plan deleted.');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function updateLocalPlan(planId: string, updater: (plan: AdminEditablePlan) => AdminEditablePlan) {
    setPlans((current) => current.map((plan) => (plan.id === planId ? updater(plan) : plan)));
  }

  if (plans.length === 0) {
    return (
      <section className='rounded-xl border border-dashed border-black/10 bg-white p-12 text-center shadow-[0_25px_70px_rgba(0,0,0,0.06)]'>
        <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517] mb-4'>Plans</p>
        <h2 className='font-serif text-3xl text-black mb-4'>No saved plans yet</h2>
        <p className='max-w-md mx-auto text-sm text-black/65'>
          Generate and save a plan first. Saved plans will appear here for later editing and deletion.
        </p>
      </section>
    );
  }

  return (
    <div className='space-y-8'>
      {plans.map((plan) => {
        const isSaving = updateMutation.isPending && updateMutation.variables?.planId === plan.id;
        const isDeleting = deleteMutation.isPending && deleteMutation.variables === plan.id;

        return (
          <AdminPlanPreviewTable
            key={plan.id}
            items={plan.items}
            title={plan.title}
            isSaving={isSaving}
            isDeleting={isDeleting}
            eyebrow='Saved Plan'
            heading={plan.title}
            description={`Edit this saved plan directly. ${plan.startDate && plan.endDate ? `Current range: ${plan.startDate} to ${plan.endDate}.` : ''}`}
            saveLabel='Save Changes'
            onTitleChange={(title) =>
              updateLocalPlan(plan.id, (current) => ({
                ...current,
                title,
              }))
            }
            onItemUpdate={(index, patch) =>
              updateLocalPlan(plan.id, (current) => ({
                ...current,
                items: current.items.map((item, itemIndex) =>
                  itemIndex === index ? { ...item, ...patch } : item
                ),
              }))
            }
            onSave={() =>
              updateMutation.mutate({
                planId: plan.id,
                title: plan.title,
                monthDate: deriveMonthDate(plan.items, plan.monthDate),
                items: plan.items,
              })
            }
            onDelete={() => {
              if (!window.confirm(`Delete "${plan.title}"? This also removes its schedule items, logs, progress, and testimonials.`)) {
                return;
              }
              deleteMutation.mutate(plan.id);
            }}
          />
        );
      })}
    </div>
  );
}
