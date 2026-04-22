import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JOIN_URL, SUPABASE_GENERAL_BASE, bookClubMemberStrip } from '@/lib/book-club';

const BookClubHero = () => {
  return (
    <section className='relative min-h-[90vh] flex items-center overflow-hidden bg-foreground text-background'>
      <div className='absolute inset-0 z-0'>
        <img
          src={`${SUPABASE_GENERAL_BASE}/DL8A8599_tiqmwb.jpg`}
          alt='Book club community gathering'
          className='w-full h-full object-cover opacity-20'
          loading='eager'
          fetchPriority='high'
          decoding='async'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-transparent' />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 py-32 w-full'>
        <div className='max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000'>
          <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-6 block'>
            Amor Fati Book Club · 2026 · Quarterly Investment
          </span>
          <h1 className='text-5xl md:text-7xl font-serif font-black leading-tight mb-8 text-white uppercase'>
            Join The <span className='italic text-primary'>Movement</span>
          </h1>
          <p className='text-xl text-white/70 mb-10 max-w-xl leading-relaxed'>
            You're not just paying to read a book. You're investing in a system that forces your life to change. 
            300 people. 3 months. One decision that separates who you were from who you're about to become.
          </p>
          <div className='flex flex-wrap gap-4'>
            <Button
              asChild
              size='lg'
              className='bg-primary text-primary-foreground px-10 py-6 h-auto text-sm font-bold uppercase tracking-widest hover:brightness-110 hover:scale-105 transition-all rounded-none'
            >
              <Link href={JOIN_URL} target='_blank' rel='noopener noreferrer'>
                ₦75,000 · JOIN NOW <ArrowRight className='ml-2 w-4 h-4' />
              </Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='border-white/30 text-white bg-transparent px-10 py-6 h-auto text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all rounded-none'
            >
              <Link href='#benefits'>See What's Inside</Link>
            </Button>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10'>
            <div>
              <div className='text-2xl font-serif font-black text-white'>300</div>
              <div className='text-[10px] uppercase tracking-widest text-white/50'>Total Seats This Quarter</div>
            </div>
            <div>
              <div className='text-2xl font-serif font-black text-primary'>100</div>
              <div className='text-[10px] uppercase tracking-widest text-white/50'>Names On The Wall Forever</div>
            </div>
            <div className='hidden md:block'>
              <div className='text-2xl font-serif font-black text-white'>3</div>
              <div className='text-[10px] uppercase tracking-widest text-white/50'>Months. One Payment.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookClubHero;
