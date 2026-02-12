import React from 'react';
import { Play } from 'lucide-react';
import { testimonials } from '@/lib/data';

const Gallery = () => {
  return (
    <section className='py-24 px-6 bg-black text-white overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-16 text-center max-w-3xl mx-auto'>
          <h2 className='text-4xl md:text-5xl font-serif font-bold mb-6'>
            Experience the Momentum
          </h2>
          <p className='text-slate-400 text-lg'>
            Browse through moments of breakthrough, connection, and pure energy from our past global
            events.
          </p>
        </div>
        <div className='relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-primary/10 group cursor-pointer'>
          <img
            alt='Latest Retreat Highlight'
            className='absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 transition-transform duration-1000'
            src='https://lh3.googleusercontent.com/aida-public/AB6AXuBemcUQMKcNCrjisjHTUtNwB0z2dB7TIhzVgCmATNVswdvvF34zSq8C4w9NTD8hrncKZtadXJd_qXiqzwlbi2NTRwzEMLPgAXVFLgr7if3P_hMO0l6BJzUwYhybDN2HPH3SGaYJ0MaDhoXg1w5_Ew7HZnSfqmD-o7vNQkYm9jdNyZ0kIEOo2YBQ2PxoCWPwZ1tBKXA2Djv0HTQnlCQWsCNjNN3L8pvQqrTtrTFAQjLJCbLdxAf6E1hgJ__I1QkFeGJ_JZWmiewNPoyn'
          />
          <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
            <div className='w-24 h-24 bg-primary rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-primary/20'>
              <Play className='text-black w-10 h-10 fill-black' />
            </div>
          </div>
          <div className='absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent'>
            <span className='text-primary font-bold uppercase tracking-widest text-sm mb-2 block'>
              Watch Recap
            </span>
            <h3 className='text-2xl font-bold'>2023 Summer Global Retreat: FIJI</h3>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {testimonials.map((item, index) => (
            <div className={`space-y-4 ${index % 2 === 0 ? 'pt-8 md:pt-16' : ''}`} key={index}>
              <div className='relative rounded-2xl overflow-hidden group'>
                <img
                  alt={item.title}
                  className='w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110'
                  src={item.image_1}
                />
                <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4'>
                  <p className='text-xs font-medium text-white'>{item.title}</p>
                </div>
              </div>
              <div className='relative rounded-2xl overflow-hidden group'>
                <img
                  alt={item.title}
                  className='w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110'
                  src={item.image_2}
                />
                <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4'>
                  <p className='text-xs font-medium text-white'>{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
