import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JOIN_URL } from '@/lib/book-club';

const BookClubCTA = () => {
  return (
    <section className='py-32 bg-foreground text-background relative overflow-hidden'>
      <div className='absolute inset-0 opacity-5'>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className='absolute text-[200px] font-serif font-black text-primary leading-none select-none'
              style={{ top: `${i * 20 - 10}%`, left: `${(i % 3) * 33}%`, opacity: 0.3 }}
            >
              AF
            </div>
          ))}
      </div>

      <div className='relative z-10 max-w-3xl mx-auto px-6 text-center'>
        <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-6 block'>
          The Decision Is Simple
        </span>
        <h2 className='text-5xl md:text-7xl font-serif font-black leading-tight mb-8 text-white'>
          Your next chapter
          <br />
          <span className='italic text-primary'>starts now.</span>
        </h2>
        <p className='text-white/60 text-xl mb-12 max-w-xl mx-auto leading-relaxed'>
          It takes 30 seconds. And 500+ people are already inside waiting to grow with you. What
          are you waiting for?
        </p>
        <Button
          asChild
          size='lg'
          className='bg-primary text-primary-foreground px-16 py-8 h-auto text-base font-black uppercase tracking-widest hover:brightness-110 hover:scale-105 transition-all rounded-none shadow-2xl shadow-primary/20'
        >
          <Link href={JOIN_URL} target='_blank' rel='noopener noreferrer'>
            Join the Book Club <ArrowRight className='ml-3 w-5 h-5' />
          </Link>
        </Button>
        <p className='text-white/30 text-sm mt-6'>
          Private membership. No email required. Just show up.
        </p>
      </div>
    </section>
  );
};

export default BookClubCTA;
