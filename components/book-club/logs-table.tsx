import { format, parseISO } from 'date-fns';
import type { DailyLogWithProfile } from '@/lib/book-club/types';
import { ExternalLink } from 'lucide-react';

export function LogsTable({ logs }: { logs: DailyLogWithProfile[] }) {
  return (
    <div className='overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.06)]'>
      <div className='overflow-x-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr className='border-b border-black/5 bg-black/[0.02]'>
              <th className='px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40'>Member</th>
              <th className='px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40'>Schedule Item</th>
              <th className='px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40'>Log Date</th>
              <th className='px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40'>Description</th>
              <th className='px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40'>Proof</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-black/5'>
            {logs.map((log) => (
              <tr key={log.id} className='hover:bg-black/[0.01] transition-colors'>
                <td className='px-6 py-4'>
                  <p className='font-medium text-black'>{log.profile.fullName}</p>
                  <p className='text-xs text-black/40'>{log.profile.email}</p>
                </td>
                <td className='px-6 py-4'>
                  <p className='text-sm text-black'>{log.scheduleItem?.label}</p>
                  <p className='text-[10px] text-black/40'>{log.scheduleItem?.date}</p>
                </td>
                <td className='px-6 py-4 text-sm text-black'>
                  {format(parseISO(log.createdAt), 'MMM d, HH:mm')}
                </td>
                <td className='px-6 py-4 text-sm text-black/60 max-w-xs'>
                  <div className='truncate' title={log.desc}>
                    {log.desc || <span className='italic text-black/20'>No reflection</span>}
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <a 
                    href={log.nestugeUrl} 
                    target='_blank' 
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 text-xs text-[#d9a517] hover:underline'
                  >
                    Link <ExternalLink className='size-3' />
                  </a>
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={5} className='px-6 py-12 text-center text-sm text-black/40 italic'>
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
