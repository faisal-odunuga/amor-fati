import React from 'react';
import { Quote, TrendingUp } from 'lucide-react';
import { bookClubMembers } from '@/lib/book-club';
import { SiteImage } from '@/components/ui/site-image';
import Link from 'next/link';

const BookClubStories = () => {
  return (
    <section className='py-24 bg-background border-t border-border'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-4 block'>
            Pioneer Members
          </span>
          <h2 className='text-4xl md:text-5xl font-serif font-black mb-4'>
            What changed when pioneers applied the work.
          </h2>
          <p className='text-muted-foreground text-lg max-w-xl mx-auto'>
            These are the early shifts members reported after reading, reflecting, and applying
            what they learned.
          </p>
          <div className='w-24 h-1 bg-primary mx-auto mt-6' />
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8'>
          {bookClubMembers.slice(0, 10).map((s) => (
            <div
              key={s.name}
              className='bg-muted/30 p-6 sm:p-10 relative group hover:shadow-lg transition-all duration-300'
            >
              <Quote className='text-primary/20 w-12 h-12 absolute top-6 right-6' />
              <div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6'>
                <TrendingUp className='w-3.5 h-3.5' />
                {s.result}
              </div>
              <p className='italic text-muted-foreground text-base leading-relaxed mb-8 relative z-10'>
                {s.quote}
              </p>
              <div className='flex items-center gap-4 border-t border-border pt-6'>
                <SiteImage
                  src={s.avatar}
                  alt={s.name}
                  width={56}
                  height={56}
                  sizes='56px'
                  className='w-14 h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
                />
                <div>
                  <h4 className='font-bold font-serif'>{s.name}</h4>
                  <p className='text-sm text-muted-foreground'>{s.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-20 text-center'>
          <Link
            href='/book-club/members'
            className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-5 font-bold uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-primary/20'
          >
            View All Members
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookClubStories;
