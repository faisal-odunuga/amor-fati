import React from 'react';
import { SUPABASE_GENERAL_BASE } from '@/lib/book-club';
import { SiteImage } from '@/components/ui/site-image';

const BookClubAbout = () => {
  return (
    <section className='py-24 bg-secondary/20'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid lg:grid-cols-2 gap-12 sm:gap-20 items-center'>
          <div>
            <SiteImage
              src={`${SUPABASE_GENERAL_BASE}/DL8A8625_orzhon.jpg`}
              alt='Moh Sheriff'
              width={1200}
              height={1500}
              sizes='(min-width: 1024px) 45vw, 100vw'
              className='w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl'
            />
          </div>
          <div>
            <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-4 block border-b-2 border-primary pb-1 w-fit'>
              About the Book Club
            </span>
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-serif font-black leading-tight mb-6'>
              What it is and who it is for.
            </h2>
            <div className='space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg'>
              <p>
                Amor Fati means the love of fate. It is about living your life the exact way you
                would gladly relive it if given another chance.
              </p>
              <p>
                The Amor Fati Book Club is a community where members do not just read. They
                implement and reflect on what they read until the lesson becomes a change in how
                they live.
              </p>
              <div className='pt-2'>
                <p className='text-foreground font-semibold mb-3'>It is meant for:</p>
                <ul className='space-y-2 text-base sm:text-lg'>
                  <li>Those who would gladly relive their lives the exact way they lived them.</li>
                  <li>The few people obsessed with creating an exceptional life and owning the process.</li>
                  <li>People who want to unlock their 1% version.</li>
                  <li>People who want to remove luck and chance from their existence and focus on the mindset needed for massive success.</li>
                  <li>People who refuse to settle for leftovers or depend on hope and prayer for their life.</li>
                </ul>
              </div>
            </div>
            <div className='mt-8'>
              <p className='font-serif font-black text-2xl'>— Amor Fati Book Club</p>
              <p className='text-muted-foreground text-sm mt-1'>Read. Implement. Reflect.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookClubAbout;
