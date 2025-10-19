import { Button } from '@/components/ui/button';
import { ArrowRight, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const About = () => {
  return (
    <section className='py-32 px-6 bg-secondary/30'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div className='relative h-[600px] rounded-2xl overflow-hidden group'>
            <Image
              src='/moh-sheriff.jpeg'
              alt='Sheriff Muhammad'
              width={100}
              height={100}
              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-background/60 to-transparent' />
          </div>
          <div className='space-y-6'>
            <div className='inline-flex items-center gap-2 text-accent font-medium'>
              <User className='h-5 w-5' />
              <span>About</span>
            </div>
            <h2 className='font-serif text-4xl md:text-5xl font-bold text-balance'>
              Meet Sheriff Muhammad
            </h2>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              Founder of Amor Fati. Architect of transformation. Helping individuals and teams
              unlock their full potential.
            </p>
            <Button asChild size='lg' variant='outline' className='group bg-transparent'>
              <Link href='/about'>
                Learn More
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
