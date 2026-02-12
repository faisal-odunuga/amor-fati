import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className='py-24 bg-background overflow-hidden border-t border-border'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-serif font-black mb-4'>
            REAL STORIES, REAL RESULTS
          </h2>
          <div className='w-24 h-1 bg-primary mx-auto' />
        </div>
        <div className='grid md:grid-cols-3 gap-10'>
          <div className='bg-muted/30 p-10 relative '>
            <Quote className='text-primary/20 w-12 h-12 absolute top-6 right-6' />
            <p className='italic text-lg mb-8 relative z-10 text-muted-foreground'>
              "My favorite thing about this event has been connecting with people from all over the
              world. The energy is absolutely infectious and life-changing."
            </p>
            <div className='flex items-center gap-4'>
              <img
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuBZPl-hWdYYdv9WrAT6zCXkhlRP-Ce61FuV0X2EfLmaKEVp5Xrsv3xfflsvH5YKc753AipP7IXzHiESJNtpY3V-0i-u6gNdrC7oWmwKAQL6QdbA4ABmNZbInjmlq0IOlcO4YJrZAcKs6KD3xBex2SZbZ0XJUgDsSXB9yV5VJFuGtp1XJ_FBOKkM-mSPrauCR9Ew7DocMZZbWoGa3y6YZUh757iJTVDfCTBS6tXgXRqPAc5EUW3I8toq43t_sIqu0gzKwqxRJJGmHh_Q'
                alt='User portrait'
                className='w-14 h-14 rounded-full object-cover'
              />
              <div>
                <h4 className='font-bold font-serif'>Aria Fitness</h4>
                <p className='text-sm opacity-60'>Personal Trainer</p>
              </div>
            </div>
          </div>
          <div className='bg-muted/30 p-10 relative '>
            <Quote className='text-primary/20 w-12 h-12 absolute top-6 right-6' />
            <p className='italic text-lg mb-8 relative z-10 text-muted-foreground'>
              "Having one dream is no longer in my life. I now have millions of dreams, and the
              tools to actually achieve every single one of them."
            </p>
            <div className='flex items-center gap-4'>
              <img
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuCbb-i8Qguk4ad7gJTPY_H0ijJzc6VD9ibdInVWx2t1FvugHscHzogXVusH4kBbF6cwB7hYVcdnwk-m5t44cC6hn0Q7OF7duEbreRvm1uoIhnwBvYGge5j_fojH8H5QaKmgpXJvL8nSan3vtOl8Qiz2eE4SvamoetOG2OadNS5R0MuTw91QjxBRzD7MnrafIT9uQBP7ZJ6VsorIaphagPVTzTB2vbwQNknW-tlbr9m9Xhmm97u_0Tj33wisl8Dw6LUo7sIy0n1HJg18'
                alt='User portrait'
                className='w-14 h-14 rounded-full object-cover'
              />
              <div>
                <h4 className='font-bold font-serif'>James Turner</h4>
                <p className='text-sm opacity-60'>Entrepreneur</p>
              </div>
            </div>
          </div>
          <div className='bg-muted/30 p-10 relative '>
            <Quote className='text-primary/20 w-12 h-12 absolute top-6 right-6' />
            <p className='italic text-lg mb-8 relative z-10 text-muted-foreground'>
              "This is an opportunity to remove yourself from the weeds of your business, and just
              get on top of it. I have more energy than I've ever had."
            </p>
            <div className='flex items-center gap-4'>
              <img
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuC88enlctwNuwONHazGIeJp7l5GXcITN2oj05IjhhFLO9D_yhCAhCBuVdIDPSlSyg1kNlbaIo2Ig7HqtRNX8FOl3FI8NlneLlpO2Tv4MD5lbNFeYKI4-KH5NbfCiuxULzfV9lbrMZaxEwAC0XAF6W1NgjeO8rq_VVd24hGpR6Gg45AASlYE8UyeREhZD4tdedXL2KI2udYbay6KZkZLLnQfV0CmhPRmbhiGnk4SqUKJgFh2vjJ2zSJIm1NmFSHeprGjFAq3j-AKeWDl'
                alt='User portrait'
                className='w-14 h-14 rounded-full object-cover'
              />
              <div>
                <h4 className='font-bold font-serif'>Adele S.</h4>
                <p className='text-sm opacity-60'>Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
