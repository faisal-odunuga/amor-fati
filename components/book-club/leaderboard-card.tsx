import { Trophy, Flame, Target } from 'lucide-react';
import type { LeaderboardEntry } from '@/lib/book-club/types';
import { cn } from '@/utils';

export function LeaderboardCard({ leaderboard, currentProfileId }: { leaderboard: LeaderboardEntry[], currentProfileId: string }) {
  if (leaderboard.length === 0) return null;

  return (
    <div className='rounded-xl border border-black/10 bg-white p-5 shadow-[0_25px_70px_rgba(0,0,0,0.06)] sm:p-6'>
      <div className='flex items-center gap-3 border-b border-black/8 pb-4 mb-6'>
        <Trophy className='size-4 text-[#d9a517]' />
        <div>
          <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517]'>Accountability</p>
          <h3 className='mt-1 font-serif text-lg text-black'>Consistency Leaderboard</h3>
        </div>
      </div>
      
      <div className='space-y-3'>
        {leaderboard.map((entry, index) => {
          const isCurrentUser = entry.profileId === currentProfileId;
          const rank = index + 1;
          
          return (
            <div 
              key={entry.profileId} 
              className={cn(
                'flex items-center justify-between px-4 py-3 rounded-none border transition-all duration-300',
                isCurrentUser 
                  ? 'bg-[#d9a517]/5 border-[#d9a517]/20 ring-1 ring-[#d9a517]/10' 
                  : 'bg-[#faf7f1] border-black/5 hover:border-black/10'
              )}
            >
              <div className='flex items-center gap-4'>
                <div className={`flex size-8 shrink-0 items-center justify-center font-serif text-sm ${rank <= 3 ? 'bg-[#d9a517] text-white' : 'bg-black/5 text-black/40'}`}>
                  {rank}
                </div>
                <div>
                  <p className='text-sm font-medium text-black'>
                    {entry.fullName} {isCurrentUser && <span className='text-[9px] font-bold uppercase tracking-widest text-[#d9a517] ml-1.5'>— YOU</span>}
                  </p>
                  <div className='flex items-center gap-3 mt-1.5 text-[10px] font-bold uppercase tracking-widest text-black/40'>
                    <span className='flex items-center gap-1'><Target className='size-3' /> {entry.completedWeight.toFixed(1)} Wt</span>
                    <span className='flex items-center gap-1'><Flame className='size-3 text-orange-500' /> {entry.currentStreak}d</span>
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-base font-serif text-black'>{entry.score.toLocaleString()}</p>
                <p className='text-[9px] uppercase tracking-wider text-black/40'>Score</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
