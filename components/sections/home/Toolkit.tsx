import React from 'react';
import Link from 'next/link';
import { freeResources } from '@/lib/data';


const Toolkit = () => {
  return (
    <section className='py-32 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-end mb-16 gap-6'>
          <div>
            <h2 className='text-sm font-bold tracking-[0.4em] uppercase text-primary mb-4'>
              The Toolkit
            </h2>
            <h3 className='text-5xl font-serif font-bold text-foreground'>Essential Resources</h3>
          </div>
          <Link
            href='/shop'
            className='text-sm font-bold uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-primary transition-colors'
          >
            Shop All Products
          </Link>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10'>
          {freeResources.map((product, index) => (
            <div key={index} className='group'>
              <div className='bg-secondary/30 aspect-[3/4] p-8 flex items-center justify-center mb-6 relative overflow-hidden'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-3/4 shadow-2xl group-hover:scale-110 transition-transform duration-500'
                />
                <a href={product.link} target='_blank' rel='noopener noreferrer'>
                  <button className='absolute bottom-0 left-0 w-full bg-primary text-primary-foreground py-4 translate-y-full group-hover:translate-y-0 transition-transform font-bold uppercase tracking-widest text-xs'>
                    Quick Buy
                  </button>
                </a>
              </div>
              <h4 className='font-bold uppercase tracking-widest text-sm mb-1 text-foreground'>
                {product.name}
              </h4>
              <p className='text-muted-foreground text-xs'>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
