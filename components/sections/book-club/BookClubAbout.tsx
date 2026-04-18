import React from 'react';
import { SUPABASE_GENERAL_BASE } from '@/lib/book-club';

const BookClubAbout = () => {
  return (
    <section className='py-24 bg-secondary/20'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid lg:grid-cols-2 gap-20 items-center'>
          <div>
            <img
              src={`${SUPABASE_GENERAL_BASE}/DL8A8625_orzhon.jpg`}
              alt='Moh Sheriff'
              className='w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl'
              loading='lazy'
              decoding='async'
            />
          </div>
          <div>
            <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-4 block border-b-2 border-primary pb-1 w-fit'>
              A Word from Moh
            </span>
            <h2 className='text-4xl md:text-5xl font-serif font-black leading-tight mb-6'>
              I built this because I needed it.
            </h2>
            <div className='space-y-4 text-muted-foreground leading-relaxed text-lg'>
              <p>
                For years, I was buying books faster than I was reading them. Sound familiar? The
                problem wasn't laziness — it was accountability. Reading alone is too easy to
                deprioritise.
              </p>
              <p>
                So I created the Amor Fati Book Club. A place where the expectation is that you
                show up, you read, you share, and you grow. The community is the accountability.
                The results speak for themselves.
              </p>
              <p>
                We've completed 12+ books together. Members have launched businesses, rebuilt
                habits, improved relationships, and — most importantly — become more intentional
                about the life they're building.
              </p>
              <p className='text-foreground font-semibold'>
                Membership gives you access to a more intentional community. It will cost you time
                and attention, and those two things will return to you multiplied.
              </p>
            </div>
            <div className='mt-8'>
              <p className='font-serif font-black text-2xl'>— Moh Sheriff</p>
              <p className='text-muted-foreground text-sm mt-1'>Founder, Amor Fati</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookClubAbout;
