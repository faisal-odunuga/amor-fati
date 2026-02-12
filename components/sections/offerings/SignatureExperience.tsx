import React from 'react';
import { Button } from '../../ui/button';
import { CheckCircle } from 'lucide-react';

const SignatureExperience = () => {
  return (
    <section className='py-24 space-y-24'>
      {/* Signature Experience */}
      <div className='bg-foreground text-background py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div className='order-2 lg:order-1'>
              <span className='text-primary font-bold uppercase tracking-widest text-sm inline-block mb-4 border-b-2 border-primary pb-1'>
                Signature Experience
              </span>
              <h2 className='text-4xl md:text-5xl font-serif font-black mb-6 leading-tight text-white'>
                UNLEASH THE POWER WITHIN
              </h2>
              <p className='text-slate-400 text-lg mb-8 leading-relaxed'>
                Create a breakthrough in your health, wealth, and relationships. This 4-day virtual
                event is designed to help you unlock the limiting beliefs that are holding you back
                from your full potential.
              </p>
              <div className='space-y-4 mb-10'>
                <div className='flex items-start gap-3'>
                  <CheckCircle className='text-primary w-6 h-6 shrink-0' />
                  <span className='text-slate-300'>Master your emotional state and focus</span>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle className='text-primary w-6 h-6 shrink-0' />
                  <span className='text-slate-300'>Design a blueprint for lasting change</span>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle className='text-primary w-6 h-6 shrink-0' />
                  <span className='text-slate-300'>Join a global community of high-achievers</span>
                </div>
              </div>
              <Button
                size='lg'
                className='bg-primary hover:brightness-110 text-primary-foreground font-bold py-6 px-10 rounded-none transition-all text-sm uppercase tracking-widest h-auto'
              >
                Learn More & Register
              </Button>
            </div>
            <div className='order-1 lg:order-2'>
              <div className='relative group'>
                <div className='absolute -inset-1 bg-primary/30 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000' />
                <img
                  src='/images/vb-sitting.jpg'
                  alt='Audience cheering at a live event'
                  className='relative rounded-none shadow-2xl object-cover h-[500px] w-full grayscale group-hover:grayscale-0 transition-all duration-700'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Development */}
      <div className='bg-background py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div>
              <div className='relative group'>
                <div className='absolute -inset-1 bg-muted rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000' />
                <img
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuB0kYfimYrxbPA7It6YsEfDODB3rlBdkYJ59z1f8lHW-9IBWnhEjEXNFrPHwCxcwmfIjqedBb9A2AVsp8Ev5YizzUvBMWC9kh914U3jGhIISlJXDu-xC8y5A85oCpGIuZ6v5iJA89fuzpC1l9qI3ro5rGSjPEgT5cLqsPcBU3PisE3TD4Iz7UcFQ6oObHdItwObAtMn-UV1dw4xbZB7of6zlU2NUOMiSUyS16D7ZZkv3wMWPdHOe1oYi6z4fH8pJSHa_5LTq2Ff1CxB'
                  alt='Professional workshop setting'
                  className='relative rounded-none shadow-2xl object-cover h-[500px] w-full grayscale group-hover:grayscale-0 transition-all duration-700'
                />
              </div>
            </div>
            <div>
              <span className='text-primary font-bold uppercase tracking-widest text-sm inline-block mb-4 border-b-2 border-primary pb-1'>
                Professional Development
              </span>
              <h2 className='text-4xl md:text-5xl font-serif font-black mb-6 leading-tight'>
                BUSINESS & <br /> LEADERSHIP MASTERY
              </h2>
              <p className='text-muted-foreground text-lg mb-8 leading-relaxed'>
                Take your organization to the next level. Learn the critical skills needed to grow
                your business, lead your team with conviction, and dominate your marketplace.
              </p>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10'>
                <div className='p-4 bg-muted/20 border border-border rounded-none'>
                  <h4 className='font-bold text-primary mb-2 uppercase tracking-wide text-sm'>
                    Systems
                  </h4>
                  <p className='text-sm opacity-70'>
                    Optimize your internal workflows and automation.
                  </p>
                </div>
                <div className='p-4 bg-muted/20 border border-border rounded-none'>
                  <h4 className='font-bold text-primary mb-2 uppercase tracking-wide text-sm'>
                    Psychology
                  </h4>
                  <p className='text-sm opacity-70'>Master the mindset of a world-class CEO.</p>
                </div>
              </div>
              <Button
                size='lg'
                className='bg-primary hover:brightness-110 text-primary-foreground font-bold py-6 px-10 rounded-none transition-all text-sm uppercase tracking-widest h-auto'
              >
                Apply for Mastery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureExperience;
