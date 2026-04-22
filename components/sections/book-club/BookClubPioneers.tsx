import React from 'react';
import { bookClubMembers } from '@/lib/book-club';
import Image from 'next/image';
import Link from 'next/link';
import { Users } from 'lucide-react';

const BookClubPioneers = () => {
  // Take the first 10 members as pioneers for the home page preview
  const pioneers = bookClubMembers.slice(0, 10);

  return (
    <section className='py-24 bg-background border-t border-border'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4'>
            <Users className='w-4 h-4' />
            Pioneer Members
          </div>
          <h2 className='text-4xl md:text-5xl font-serif font-black mb-4'>
            The Collective Momentum.
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Join the initial wave of high-performers who have already committed to 
            reading, reflecting, and implementation.
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-16'>
          {pioneers.map((member) => (
            <div 
              key={member.name} 
              className='group flex flex-col items-center text-center p-4 rounded-2xl hover:bg-muted/30 transition-all duration-500'
            >
              <div className='relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 border-2 border-border group-hover:border-primary transition-all duration-500 shadow-lg shadow-black/5'>
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  sizes='(min-width: 640px) 128px, 96px'
                  className='object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110'
                />
              </div>
              <h3 className='font-bold font-serif text-sm sm:text-base leading-tight group-hover:text-primary transition-colors'>
                {member.name}
              </h3>
              <p className='text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1'>
                Pioneer
              </p>
            </div>
          ))}
        </div>

        <div className='text-center'>
          <Link
            href='/book-club/members'
            className='inline-flex items-center gap-3 bg-primary text-primary-foreground px-12 py-5 font-bold uppercase tracking-[0.25em] hover:scale-105 transition-all shadow-xl shadow-primary/20'
          >
            View All Members
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookClubPioneers;
