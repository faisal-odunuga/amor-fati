'use client';

import { useLogs } from '@/hooks/use-logs';
import { LoaderCircle } from 'lucide-react';

export function InsightFeed() {
  const { data: logs, isLoading, isError } = useLogs();

  return (
    <section className='border border-border bg-background p-6'>
      <p className='text-xs font-bold uppercase tracking-[0.3em] text-primary'>Proof Feed</p>
      
      {isLoading ? (
        <div className='mt-6 flex justify-center py-8'>
          <LoaderCircle className='size-6 animate-spin text-muted-foreground' />
        </div>
      ) : isError ? (
        <div className='mt-6 p-4 text-sm text-red-500 bg-red-500/10'>
          Unable to load proof feed.
        </div>
      ) : logs?.length === 0 ? (
        <div className='mt-6 p-4 text-sm text-muted-foreground border border-dashed border-border bg-secondary/10'>
          No proof logged yet.
        </div>
      ) : (
        <div className='mt-6 space-y-4'>
          {logs?.slice(-6).reverse().map((log) => (
            <article key={log.id} className='border border-border bg-secondary/20 p-5'>
              <p className='text-sm text-muted-foreground'>{new Date(log.createdAt).toLocaleDateString()}</p>
              <h4 className='mt-3 text-lg font-medium text-foreground truncate'>
                <a href={log.nestugeUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {log.nestugeUrl}
                </a>
              </h4>
              {log.desc && (
                <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{log.desc}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
