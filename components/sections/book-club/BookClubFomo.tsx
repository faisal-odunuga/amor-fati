import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JOIN_URL, SUPABASE_GENERAL_BASE, bookClubMissingOut } from '@/lib/book-club';

const BookClubFomo = () => {
  return (
    <section className='py-24 bg-secondary/30'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          <div>
            <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-4 block border-b-2 border-primary pb-1 w-fit'>
              While You're On the Fence
            </span>
            <h2 className='text-4xl md:text-5xl font-serif font-black leading-tight mb-6'>
              Every month you wait is a{' '}
              <span className='italic text-primary'>chapter you'll never get back.</span>
            </h2>
            <p className='text-muted-foreground text-lg leading-relaxed mb-8'>
              Right now, 500+ members are reading, discussing, and applying ideas that are
              compounding into real results. The community moves forward with or without you.
              Here's what you're missing each month you're not inside:
            </p>
            <ul className='space-y-4'>
              {bookClubMissingOut.map((item) => (
                <li key={item} className='flex items-start gap-3'>
                  <CheckCircle className='w-5 h-5 text-primary shrink-0 mt-0.5' />
                  <span className='text-foreground/80'>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              size='lg'
              className='mt-10 bg-primary text-primary-foreground px-10 py-6 h-auto text-sm font-bold uppercase tracking-widest hover:brightness-110 rounded-none'
            >
              <Link href={JOIN_URL} target='_blank' rel='noopener noreferrer'>
                I'm Ready - Add Me to the Club
              </Link>
            </Button>
          </div>
          <div className='relative'>
            <div className='absolute -inset-1 bg-primary/20 blur opacity-30' />
            <img
              src={`${SUPABASE_GENERAL_BASE}/bookclub.png`}
              alt='Amor Fati Book Club community'
              className='relative w-full object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700'
              loading='lazy'
              decoding='async'
            />
            <div className='absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-6 shadow-xl'>
              <p className='text-3xl font-serif font-black'>Members.</p>
              <p className='text-xs font-bold uppercase tracking-widest opacity-80'>
                Private. Limited Access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookClubFomo;
