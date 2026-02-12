import React from 'react';

const Legacy = () => {
  return (
    <section className='py-32 px-6 bg-background'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-20'>
          <h2 className='text-sm font-bold tracking-[0.4em] uppercase text-primary mb-4'>
            A Legacy of Impact
          </h2>
          <h3 className='text-5xl font-serif font-bold text-foreground'>Previous Chapters</h3>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]'>
          {/* Main Large Image */}
          <div className='md:col-span-2 md:row-span-2 relative overflow-hidden group'>
            <img
              src='/images/vb-moh.jpg'
              alt='London Summit'
              className='w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity'>
              <p className='text-primary font-bold uppercase text-xs tracking-widest mb-2'>
                London Summit 2023
              </p>
              <h4 className='text-2xl text-white font-serif'>The Art of Negotiation</h4>
            </div>
          </div>

          {/* Regular Image 1 */}
          <div className='relative overflow-hidden group'>
            <img
              src='/images/full-vb.jpg'
              alt='Speaker'
              className='w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700'
            />
          </div>

          {/* Regular Image 2 */}
          <div className='relative overflow-hidden group'>
            <img
              src='/images/vb-1.jpg'
              alt='Networking'
              className='w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700'
            />
          </div>

          {/* Regular Image 3 */}
          <div className='md:col-span-1 relative overflow-hidden group'>
            <img
              src='/images/vb-2.jpg'
              alt='Mentorship'
              className='w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700'
            />
          </div>

          {/* Wide Image 4 */}
          <div className='md:col-span-2 relative overflow-hidden group'>
            <img
              src='/images/full-vb.jpg'
              alt='Singapore'
              className='w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity'>
              <p className='text-primary font-bold uppercase text-xs tracking-widest mb-2'>
                Singapore 2022
              </p>
              <h4 className='text-2xl text-white font-serif'>Elite Mindset Protocol</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legacy;
