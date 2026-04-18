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
            Amor Fati Book Club
          </span>
          <h1 className='text-5xl md:text-7xl font-serif font-black leading-tight mb-8 text-white'>
            Read Together. <span className='italic text-primary'>Rise Together.</span>
          </h1>
          <p className='text-xl text-white/70 mb-10 max-w-xl leading-relaxed'>
            A community of growth-obsessed readers who don't just finish books — they apply them.
            One book a month. Real conversations. Real results.
          </p>
          <div className='flex flex-wrap gap-4'>
            <Button
              asChild
              size='lg'
              className='bg-primary text-primary-foreground px-10 py-6 h-auto text-sm font-bold uppercase tracking-widest hover:brightness-110 hover:scale-105 transition-all rounded-none'
            >
              <Link href={JOIN_URL} target='_blank' rel='noopener noreferrer'>
                Join Now - It Takes 30 Seconds <ArrowRight className='ml-2 w-4 h-4' />
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

          <div className='flex items-center gap-6 mt-12 pt-8 border-t border-white/10'>
            <div className='flex -space-x-3'>
              {bookClubMemberStrip.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt='Member'
                  className='w-10 h-10 rounded-full object-cover border-2 border-foreground grayscale'
                  loading='lazy'
                  decoding='async'
                />
              ))}
            </div>
            <div>
              <div className='flex gap-0.5 mb-1'>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className='w-4 h-4 fill-primary text-primary' />
                  ))}
              </div>
              <span className='text-white/60 text-sm'>500+ members already inside</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookClubHero;
