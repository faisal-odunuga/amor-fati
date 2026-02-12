import { ArrowRight, CheckCircle } from 'lucide-react';
import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';

const Philosophy = () => {
  return (
    <section className='py-32 px-6 bg-background'>
      <div className='max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center'>
        <div className='relative'>
          <div className='aspect-[4/5] bg-muted overflow-hidden'>
            <img
              src='/images/statue.png'
              className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-90'
            />
          </div>
          <div className='absolute -bottom-8 -right-8 w-64 h-64 border border-primary/20 -z-10' />
        </div>

        <div>
          <h2 className='text-sm font-bold tracking-[0.4em] uppercase text-primary mb-6'>
            The Core Philosophy
          </h2>
          <h3 className='text-5xl font-serif font-bold mb-8 text-foreground'>
            Amor Fati: <br />
            <span className='text-muted-foreground italic font-normal'>Love of Fate.</span>
          </h3>
          <p className='text-lg text-muted-foreground mb-10 leading-relaxed'>
            True power is not found in controlling the external world, but in the radical acceptance
            and mastery of one's internal landscape. We teach you to thrive within chaos, not just
            survive it.
          </p>
          <ul className='space-y-8'>
            <li className='flex items-start gap-4'>
              <CheckCircle className='w-6 h-6 text-primary mt-1 shrink-0' />
              <div>
                <h4 className='font-bold uppercase tracking-wider mb-2 text-foreground'>
                  Radical Ownership
                </h4>
                <p className='text-muted-foreground text-sm'>
                  Every outcome is a reflection of internal alignment. To blame is to forfeit power.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <CheckCircle className='w-6 h-6 text-primary mt-1 shrink-0' />
              <div>
                <h4 className='font-bold uppercase tracking-wider mb-2 text-foreground'>
                  Strategic Silence
                </h4>
                <p className='text-muted-foreground text-sm'>
                  Finding clarity in a world designed for distraction. stillness is the ultimate
                  weapon.
                </p>
              </div>
            </li>
          </ul>
          <Button
            asChild
            variant='link'
            className='mt-12 text-primary font-bold uppercase tracking-widest p-0 h-auto hover:text-primary/80 group'
          >
            <Link href='/philosophy' className='flex items-center gap-2'>
              Learn the Methodology
              <ArrowRight className='w-4 h-4 group-hover:translate-x-2 transition-transform' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
