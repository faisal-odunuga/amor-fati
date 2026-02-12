import React from 'react';

const FeaturedIn = () => {
  return (
    <section className='py-16 border-t border-border'>
      <div className='max-w-7xl mx-auto px-6'>
        <p className='text-center text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-12'>
          Featured In
        </p>
        <div className='flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500'>
          <span className='text-2xl font-bold font-serif italic'>Forbes</span>
          <span className='text-2xl font-black'>FORTUNE</span>
          <span className='text-2xl font-bold'>Inc.</span>
          <span className='text-2xl font-serif'>The Wall Street Journal</span>
          <span className='text-2xl font-bold tracking-tighter'>Fast Company</span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
