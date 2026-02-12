import React from 'react';
import { ArrowDown } from 'lucide-react';

const PhilosophyHero = () => {
  return (
    <section className='relative h-[80vh] flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='w-full h-full object-cover opacity-50 grayscale'
        >
          <source
            src='https://res.cloudinary.com/dsvd234/video/upload/v1/ocean-waves-slow-motion'
            type='video/mp4'
          />
          {/* Fallback image if video fails or while loading */}
          <img
            src='https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=2000'
            alt='Ocean waves'
            className='w-full h-full object-cover'
          />
        </video>
        <div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30' />
      </div>

      <div className='relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8'>
        <h4 className='text-primary font-bold uppercase tracking-[0.4em] text-sm md:text-base animate-in fade-in slide-in-from-bottom-8 duration-1000'>
          The Manifesto
        </h4>
        <h1 className='font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200'>
          CHAOS IS THE <br /> <span className='italic text-primary'>CATALYST.</span>
        </h1>
        <p className='text-lg md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400'>
          We don't seek comfort. We seek the fire that burns away everything that isn't true. This
          is the path of the Amor Fati.
        </p>
      </div>

      <div className='absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50'>
        <ArrowDown className='w-6 h-6' />
      </div>
    </section>
  );
};

export default PhilosophyHero;
