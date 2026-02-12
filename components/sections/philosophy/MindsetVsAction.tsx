import React from 'react';
import { ArrowRight } from 'lucide-react';

const MindsetVsAction = () => {
  return (
    <section className='py-32 bg-secondary/30'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid lg:grid-cols-2 gap-20 items-center'>
          <div className='space-y-12'>
            <div>
              <h2 className='font-serif text-4xl md:text-5xl font-bold mb-6'>
                Mindset is the map. <br />
                <span className='text-primary'>Action is the terrain.</span>
              </h2>
              <p className='text-xl text-muted-foreground leading-relaxed'>
                Most people get stuck staring at the map. They visualize, they affirm, they hope.
                But the map is not the territory. To cross the mountain, you must walk.
              </p>
            </div>

            <div className='space-y-8'>
              <div className='flex gap-6'>
                <div className='w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center shrink-0 font-serif font-bold text-xl'>
                  A
                </div>
                <div>
                  <h4 className='font-bold uppercase tracking-widest mb-2'>
                    Intellectual Understanding
                  </h4>
                  <p className='text-muted-foreground'>
                    Reading the books, knowing the concepts. This is the comfort zone of "feeling"
                    productive without danger.
                  </p>
                </div>
              </div>
              <div className='flex gap-6 relative'>
                <div className='absolute left-6 top-12 bottom-0 w-px bg-primary/20 -z-10' />
                <div className='w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-serif font-bold text-xl shadow-lg shadow-primary/20'>
                  B
                </div>
                <div>
                  <h4 className='font-bold uppercase tracking-widest mb-2 text-primary'>
                    Embodied Knowledge
                  </h4>
                  <p className='text-foreground font-medium'>
                    The wisdom earned through sweat, failure, and execution. This is where
                    transformation happens.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='relative h-[600px] w-full'>
            <div className='absolute inset-0 bg-black/5 rounded-0 transform rotate-3' />
            <img
              src='/images/moh-sheriff.jpeg'
              alt='Person Taking Action'
              className='relative z-10 w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000'
            />
            <div className='absolute bottom-12 left-0 z-20 bg-background/90 backdrop-blur p-8 max-w-sm border-l-4 border-primary'>
              <p className='font-serif italic text-lg text-foreground'>
                "You must do the thing you think you cannot do."
              </p>
              <p className='text-xs uppercase tracking-widest mt-4 text-muted-foreground'>
                Moh Sheriff
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MindsetVsAction;
