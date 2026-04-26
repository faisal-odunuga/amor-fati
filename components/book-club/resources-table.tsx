'use client';

import { FileText, ShieldCheck, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ResourceAsset } from '@/lib/book-club/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

function ResourceRow({ resource }: { resource: ResourceAsset }) {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/resources/${resource.id}`);
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Failed to generate signed URL.');
      }
      return payload.signedUrl;
    },
    onSuccess: (signedUrl) => {
      window.open(signedUrl, '_blank');
      toast.success('Generated secure download link.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <article className='group flex flex-col gap-6 rounded-none border border-black/8 bg-[#faf7f1] p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
      <div className='flex items-start gap-4'>
        <div className='flex size-11 shrink-0 items-center justify-center border border-black/10 bg-white text-[#d9a517] transition-colors group-hover:border-[#d9a517]/30'>
          <FileText className='size-5' />
        </div>
        <div>
          <h4 className='font-medium text-black'>{resource.title}</h4>
          <p className='mt-1 text-xs text-black/55 leading-relaxed'>{resource.description}</p>
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-3 border-t border-black/5 pt-4 sm:border-t-0 sm:pt-0'>
        {resource.isMembersOnly ? (
          <div className='inline-flex items-center gap-2 rounded-none border border-black/5 bg-black/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-black/40'>
            <ShieldCheck className='size-3.5 text-[#d9a517]' />
            Members Only
          </div>
        ) : (
          <div className='inline-flex items-center gap-2 rounded-none border border-black/5 bg-black/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-black/40'>
            Public
          </div>
        )}
        <Button
          variant='outline'
          className='h-10 grow rounded-none border-black/10 bg-white font-bold uppercase tracking-widest text-[10px] hover:border-[#d9a517] hover:bg-[#d9a517] hover:text-white sm:grow-0'
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <LoaderCircle className='size-4 animate-spin mr-2' /> : null}
          Secure Link →
        </Button>
      </div>
    </article>
  );
}

export function ResourcesTable({ resources }: { resources: ResourceAsset[] }) {
  if (resources.length === 0) {
    return (
      <PlatformSection title='Protected Assets' eyebrow='Storage'>
        <div className='rounded-none border border-dashed border-black/10 p-12 text-center'>
          <p className='text-sm text-black/45'>No assets have been uploaded yet.</p>
        </div>
      </PlatformSection>
    );
  }

  return (
    <PlatformSection title='Protected Assets' eyebrow='Storage'>
      <div className='space-y-3'>
        {resources.map((resource) => (
          <ResourceRow key={resource.id} resource={resource} />
        ))}
      </div>
    </PlatformSection>
  );
}
