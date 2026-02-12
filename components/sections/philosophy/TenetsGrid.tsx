import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';

const tenets = [
  { title: 'Reject Mediocrity', text: 'Good is the enemy of the exceptional.' },
  { title: 'Seek Discomfort', text: 'Safety is an illusion. Growth lives in the unknown.' },
  { title: 'Dominate the Self', text: 'If you cannot command yourself, you will be commanded.' },
  { title: 'Create Value', text: 'The market rewards contribution, not intention.' },
  { title: 'Play the Long Game', text: 'Legacy is built in decades, not days.' },
  { title: 'Protect Your Peace', text: 'Your energy is your most expensive currency.' },
];

const TenetsGrid = () => {
  return (
    <section className='py-32 px-6 bg-foreground text-background'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-3 gap-16'>
          <div className='lg:col-span-1 space-y-8'>
            <h2 className='font-serif text-5xl font-bold leading-tight'>
              The Code of <br />
              <span className='text-primary'>Amor Fati.</span>
            </h2>
            <p className='text-slate-400 text-lg leading-relaxed'>
              These are not suggestions. They are the operating system for a high-performance life.
              Adopt them, and the world bends to your will.
            </p>
            <Button
              asChild
              size='lg'
              className='bg-primary text-primary-foreground hover:bg-white hover:text-black font-bold uppercase tracking-widest px-8 py-6 h-auto rounded-none transition-all'
            >
              <Link href='/contact'>Commit to the Code</Link>
            </Button>
          </div>

          <div className='lg:col-span-2 grid sm:grid-cols-2 gap-8'>
            {tenets.map((tenet, index) => (
              <div
                key={index}
                className='p-8 border border-white/10 hover:border-primary/50 transition-colors duration-300 group'
              >
                <span className='text-primary font-bold text-xs uppercase tracking-widest mb-4 block'>
                  Rule 0{index + 1}
                </span>
                <h4 className='font-serif text-2xl font-bold mb-3 group-hover:text-primary transition-colors'>
                  {tenet.title}
                </h4>
                <p className='text-slate-400 text-sm leading-relaxed'>{tenet.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenetsGrid;
