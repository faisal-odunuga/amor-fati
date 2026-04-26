import { Profile } from '@/lib/book-club/types';
import Link from 'next/link';
import { User, ChevronRight } from 'lucide-react';

export function MembersTable({ members }: { members: Profile[] }) {
  return (
    <div className='overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.06)]'>
      {/* Mobile Card View */}
      <div className='divide-y divide-black/5 lg:hidden'>
        {members.map((member) => (
          <div key={member.id} className='p-4 space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='size-10 flex items-center justify-center rounded-full bg-black/5'>
                  <User className='size-5 text-black/40' />
                </div>
                <div>
                  <p className='font-serif text-lg text-black'>{member.fullName}</p>
                  <p className='text-xs text-black/40'>{member.email}</p>
                </div>
              </div>
              <Link 
                href={`/admin/members/${member.id}`}
                className='p-2 text-[#d9a517]'
              >
                <ChevronRight className='size-5' />
              </Link>
            </div>
            
            <div className='flex items-center justify-between pt-2'>
              <span className={`inline-flex items-center px-2 py-1 rounded-none text-[9px] font-bold uppercase tracking-widest ${
                member.subscriptionStatus === 'active' 
                ? 'bg-green-500/10 text-green-600' 
                : 'bg-red-500/10 text-red-600'
              }`}>
                {member.subscriptionStatus}
              </span>
              <span className='text-[10px] text-black/40 uppercase tracking-widest'>
                Joined {new Date(member.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className='hidden lg:block overflow-x-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr className='border-b border-black/5 bg-black/[0.02]'>
              <th className='px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40'>Member</th>
              <th className='px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40'>Status</th>
              <th className='px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40'>Joined</th>
              <th className='px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40'>Role</th>
              <th className='px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40'>Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-black/5'>
            {members.map((member) => (
              <tr key={member.id} className='hover:bg-black/[0.01] transition-colors'>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='size-8 flex items-center justify-center rounded-full bg-black/5'>
                      <User className='size-4 text-black/40' />
                    </div>
                    <div>
                      <p className='font-medium text-black'>{member.fullName}</p>
                      <p className='text-xs text-black/40'>{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <span className={`inline-flex items-center px-2 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider ${
                    member.subscriptionStatus === 'active' 
                    ? 'bg-green-500/10 text-green-600' 
                    : 'bg-red-500/10 text-red-600'
                  }`}>
                    {member.subscriptionStatus}
                  </span>
                </td>
                <td className='px-6 py-4 text-sm text-black'>
                  {new Date(member.createdAt).toLocaleDateString()}
                </td>
                <td className='px-6 py-4'>
                  <span className='text-[10px] uppercase tracking-widest text-black/40 capitalize'>{member.role}</span>
                </td>
                <td className='px-6 py-4'>
                  <Link 
                    href={`/admin/members/${member.id}`}
                    className='inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#d9a517] hover:underline'
                  >
                    Details <ChevronRight className='size-3' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
