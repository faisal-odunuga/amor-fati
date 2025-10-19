import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Contact = () => {
  return (
    <section className='py-32 px-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='relative rounded-3xl border-2 border-accent/20 p-12 md:p-16 text-center space-y-8 overflow-hidden group hover:border-accent/40 transition-colors duration-500'>
          <div className='absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
          <div className='relative z-10'>
            <div className='inline-flex items-center gap-2 text-accent font-medium mb-6'>
              <Mail className='h-5 w-5' />
              <span>Contact</span>
            </div>
            <h2 className='font-serif text-4xl md:text-6xl font-bold text-balance mb-6'>
              Ready to realign?
            </h2>
            <p className='text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8'>
              Your transformation starts with a conversation. Let's talk about where you are and
              where you want to be.
            </p>
            <Button
              asChild
              size='lg'
              className='bg-accent hover:bg-accent/90 text-accent-foreground group'
            >
              <Link href='/contact'>
                Get in Touch
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
