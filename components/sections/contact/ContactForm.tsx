import React from 'react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { ArrowUpRight } from 'lucide-react';
import { contactMethods } from '@/utils/data';
import { getContactHref } from '@/utils';

const ContactForm = () => {
  const directContacts = contactMethods.filter((method) => method.type !== 'social');
  const socials = contactMethods.filter((method) => method.type === 'social');

  return (
    <section className='py-20 sm:py-24 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20'>
          <div>
            <h2 className='text-4xl sm:text-5xl font-serif font-bold mb-6 leading-tight'>
              Let's start your <br />
              <span className='italic text-primary'>next chapter.</span>
            </h2>
            <p className='text-muted-foreground mb-10 sm:mb-12 text-base sm:text-lg'>
              Ready to elevate your life or business? Whether you're interested in one-on-one
              coaching, booking a keynote, or joining our next retreat, I'd love to hear from you.
            </p>
            <div className='space-y-6 sm:space-y-8'>
              {directContacts.map((method, index) => (
                <div className='flex items-start gap-4' key={index}>
                  <div className='bg-primary text-primary-foreground p-3 rounded'>
                    <method.icon className='w-5 h-5' />
                  </div>
                  <div>
                    <h4 className='font-bold text-sm uppercase tracking-widest'> {method.title}</h4>
                    <Link
                      href={getContactHref(method)}
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      {method.value}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-10 sm:mt-12'>
              <p className='text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4'>
                Socials
              </p>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {socials.map((social) => (
                  <Link
                    key={social.title}
                    href={social.link ?? '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center justify-between gap-3 border border-border bg-secondary/20 px-4 py-4 text-sm hover:border-primary/40 hover:bg-secondary/40 transition-colors'
                  >
                    <span className='flex items-center gap-3'>
                      <social.icon className='w-4 h-4 text-primary' />
                      <span>
                        <span className='block font-semibold text-foreground'>{social.title}</span>
                        <span className='block text-muted-foreground'>{social.value}</span>
                      </span>
                    </span>
                    <ArrowUpRight className='w-4 h-4 text-muted-foreground' />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className='bg-secondary/30 p-6 sm:p-8 lg:p-10 rounded shadow-sm border border-border'>
            <form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2'>
                    First Name
                  </label>
                  <Input className='w-full bg-transparent border-t-0 border-x-0 border-b border-border focus-visible:ring-0 focus-visible:border-accent px-0 py-2 transition-colors rounded-none shadow-none h-auto' />
                </div>
                <div>
                  <label className='block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2'>
                    Last Name
                  </label>
                  <Input className='w-full bg-transparent border-t-0 border-x-0 border-b border-border focus-visible:ring-0 focus-visible:border-accent px-0 py-2 transition-colors rounded-none shadow-none h-auto' />
                </div>
              </div>
              <div>
                <label className='block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2'>
                  Email Address
                </label>
                <Input
                  type='email'
                  className='w-full bg-transparent border-t-0 border-x-0 border-b border-border focus-visible:ring-0 focus-visible:border-accent px-0 py-2 transition-colors rounded-none shadow-none h-auto'
                />
              </div>
              <div>
                <label className='block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2'>
                  What's on your mind?
                </label>
                <Textarea
                  className='w-full bg-transparent border-t-0 border-x-0 border-b border-border focus-visible:ring-0 focus-visible:border-accent px-0 py-2 transition-colors rounded-none shadow-none resize-none'
                  rows={4}
                />
              </div>
              <Button className='w-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] py-4 sm:py-5 hover:brightness-110 transition-all duration-300 rounded-none'>
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
