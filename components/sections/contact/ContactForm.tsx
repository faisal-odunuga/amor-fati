import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Mail, MapPin } from 'lucide-react';
import { contactMethods } from '@/lib/data';

const ContactForm = () => {
  return (
    <section className='py-24 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20'>
          <div>
            <h2 className='text-5xl font-serif font-bold mb-6'>
              Let's start your <br />
              <span className='italic text-primary'>next chapter.</span>
            </h2>
            <p className='text-muted-foreground mb-12 text-lg'>
              Ready to elevate your life or business? Whether you're interested in one-on-one
              coaching, booking a keynote, or joining our next retreat, I'd love to hear from you.
            </p>
            <div className='space-y-8'>
              {contactMethods.slice(0, 2).map((method, index) => (
                <div className='flex items-start gap-4' key={index}>
                  <div className='bg-primary text-primary-foreground p-3 rounded'>
                    <method.icon className='w-5 h-5' />
                  </div>
                  <div>
                    <h4 className='font-bold text-sm uppercase tracking-widest'> {method.title}</h4>
                    <p className='text-muted-foreground'>{method.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='bg-secondary/30 p-10 rounded shadow-sm border border-border'>
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
              <Button className='w-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] py-7 hover:brightness-110 transition-all duration-300 rounded-none'>
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
