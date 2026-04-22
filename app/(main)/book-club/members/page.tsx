import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Users } from 'lucide-react';
import type { Metadata } from 'next';
import { bookClubMembers } from '@/lib/book-club';

export const metadata: Metadata = {
  title: 'Pioneer Members | Amor Fati Book Club',
  description:
    'The community of high-performers, strategic thinkers, and action-takers building an extraordinary life.',
};

export default function MembersPage() {
  return (
    <main className='min-h-screen overflow-x-hidden bg-background px-6 py-24 text-foreground'>
      <div className='mx-auto max-w-7xl'>
        <Link
          href='/book-club'
          className='group mb-12 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary'
        >
          <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
          <span className='text-xs font-bold uppercase tracking-widest'>Back to Club</span>
        </Link>

        <div className='mb-20'>
          <div className='mb-4 flex items-center gap-4'>
            <div className='rounded-xl bg-primary/10 p-3'>
              <Users className='h-8 w-8 text-primary' />
            </div>
            <span className='text-sm font-bold uppercase tracking-[0.4em] text-primary'>
              The Collective
            </span>
          </div>
          <h1 className='mb-6 font-serif text-5xl font-black leading-tight md:text-7xl'>
            Pioneer <span className='text-primary'>Members</span>
          </h1>
          <p className='max-w-2xl text-xl leading-relaxed text-muted-foreground'>
            The first wave of individuals who chose to stop planning and start executing. A network built on responsibility, consistency, and the love of fate.
          </p>
          <div className='mt-8 h-1.5 w-32 bg-primary' />
        </div>

        <div className='grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {bookClubMembers.map((member) => (
            <div
              key={member.name}
              className='group relative cursor-default border border-border/50 bg-muted/20 p-4 transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/5 sm:p-6'
            >
              <div className='relative mb-6 aspect-square overflow-hidden'>
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  sizes='(min-width: 1280px) 200px, (min-width: 768px) 25vw, 45vw'
                  className='object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0'
                />
                <div className='absolute inset-0 bg-primary/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
              </div>

              <div className='relative z-10 space-y-1'>
                <h3 className='font-serif text-lg font-bold transition-colors group-hover:text-primary sm:text-xl'>
                  {member.name}
                </h3>
                <p className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>
                  {member.role}
                </p>
              </div>

              <div className='absolute right-0 top-0 p-2 opacity-0 transition-opacity group-hover:opacity-100'>
                <div className='h-4 w-4 border-r-2 border-t-2 border-primary' />
              </div>
            </div>
          ))}
        </div>

        <div className='mt-32 border-t border-border pt-20 text-center'>
          <h2 className='mb-8 font-serif text-3xl font-bold'>Ready to join the collective?</h2>
          <Link
            href='/contact'
            className='inline-flex items-center gap-4 bg-primary px-12 py-6 font-bold uppercase tracking-[0.3em] text-primary-foreground shadow-2xl shadow-primary/20 transition-all hover:scale-105'
          >
            Apply for Membership
          </Link>
        </div>
      </div>
    </main>
  );
}
