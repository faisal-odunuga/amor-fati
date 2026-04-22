import { FileText, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ResourceAsset } from '@/lib/book-club/types';

export function ResourcesTable({ resources }: { resources: ResourceAsset[] }) {
  return (
    <section className='border border-border bg-background p-6'>
      <div className='mb-6 flex items-center justify-between gap-4'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.3em] text-primary'>Resources</p>
          <h3 className='mt-2 font-serif text-3xl text-foreground'>Protected Assets</h3>
        </div>
      </div>

      <div className='space-y-4'>
        {resources.map((resource) => (
          <article
            key={resource.id}
            className='flex flex-wrap items-center justify-between gap-4 border border-border bg-secondary/20 p-5'
          >
            <div className='flex items-start gap-4'>
              <div className='flex size-11 items-center justify-center border border-primary/25 bg-primary/10 text-primary'>
                <FileText className='size-4' />
              </div>
              <div>
                <h4 className='text-lg text-foreground'>{resource.title}</h4>
                <p className='mt-1 text-sm text-muted-foreground'>{resource.description}</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              {resource.isMembersOnly ? (
                <div className='inline-flex items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-[0.25em] text-muted-foreground'>
                  <ShieldCheck className='size-4 text-primary' />
                  Active Members
                </div>
              ) : null}
              <Button asChild variant='outline' className='rounded-none border-primary/30 bg-background'>
                <a href={`/api/resources/${resource.id}`}>Generate Signed URL</a>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
