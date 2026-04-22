import type { DailyLog } from '@/lib/book-club/types';

export function InsightFeed({ logs }: { logs: DailyLog[] }) {
  return (
    <section className='border border-border bg-background p-6'>
      <p className='text-xs font-bold uppercase tracking-[0.3em] text-primary'>Proof Feed</p>
      <div className='mt-6 space-y-4'>
        {logs.map((log) => (
          <article key={log.id} className='border border-border bg-secondary/20 p-5'>
            <p className='text-sm text-muted-foreground'>{log.createdAt}</p>
            <h4 className='mt-3 text-xl text-foreground'>{log.keyInsight}</h4>
            <p className='mt-2 text-sm leading-6 text-muted-foreground'>{log.actionTaken}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
