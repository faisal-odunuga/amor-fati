import React from 'react';
import { Button } from '../../ui/button';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const events = [
  {
    title: 'The Awakening: London',
    date: 'October 15-17, 2024',
    location: 'The Shard, London, UK',
    time: '09:00 AM - 06:00 PM',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqA8yV7q3Z0r0z5QfH4vX1hC7jS9kL2mN5b8_3W6dF9gJqH0lR4pT8vY2xZ1c5nB7mMkL9h0jQ4r3s2tV6wX8y1uK5iO7d3e9fG2aJ4bL6qW0n8rE9tF3h5yZ7x1cI0v2k4m5n6o7p8q9rAsBtCuDvEwFxG_y1H5zK6L7M8N9O0P1Q2R3S4T5U6V7W8X9Y0Z1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7a8b9c0d1e2f3g4h5i6j7k8l9m0n',
    status: 'Open for Registration',
    description:
      'A 3-day deep dive into the core principles of Amor Fati. Shatter limiting beliefs and reconstruct your identity for peak performance.',
  },
  {
    title: 'Wealth & Wisdom Retreat',
    date: 'December 5-9, 2024',
    location: 'Bali, Indonesia',
    time: 'All Day',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtn8ho-k9_0vtw5QiNouuqxnQ1nONMt-65oWq7Q9_EIsaE1Ry2ye7CYiqd2SKAzH6tzZo2aaajTQKBu2exO0kwKOicqb7-i7i3VdZDoSOU31j6UGNjOMtuFUnLsy6LegTl62Kt9KMmfqCyJv6_y8cDY5GOLcCg_vECCezj7sZ6cT9YCUgbmE7hCLtsObldaAgt_Kg9LiYB8r8xaIuWfhLHO5SYOddKuMdjx5FsD3UHbAY8WnawZyqhbgfLtMPiR_t3xmBnpqFhCLW3',
    status: 'Waitlist Only',
    description:
      'An exclusive immersive experience for high-net-worth individuals seeking spiritual alignment with their material success.',
  },
  {
    title: 'New Year Strategic Planning',
    date: 'January 10, 2025',
    location: 'Virtual Masterclass',
    time: '10:00 AM - 02:00 PM EST',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMc8L1uywBjnIOv_yEzCYqYQ4Bg389rEAxoCZXpdLfeTPyUgJZwP7yCa6EXhhizmkm_lkNS6n8fpOe4STPqw-xLTsSVCZ7Rf9ZrrgML9gmq8omuFuuKCG8yuB6M8We4cvK2hBzUDOarvsKwIxErNAMXWWL_izbFGjPwDeZavWkGC3AqZnX1lPNiUMaj4WQ5vhOveZ0VqVRklgcONBhPVa7ttbEqS2XhNgke3rCYhZuvJDsMrULNgf2aeqQ-VMGNxqfBjbAY1LKMV65',
    status: 'Coming Soon',
    description:
      'Design your year with surgical precision. A virtual workshop to set intention, strategy, and execution plans for 2025.',
  },
];

const WorkshopList = () => {
  return (
    <section id='upcoming' className='py-24 px-6 bg-background'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-16'>
          <h2 className='font-serif text-4xl md:text-5xl font-bold mb-4'>Upcoming Events</h2>
          <div className='w-full h-px bg-border' />
        </div>

        <div className='space-y-12'>
          {events.map((event, index) => (
            <div
              key={index}
              className='grid md:grid-cols-12 gap-8 items-center group border-b border-border pb-12 last:border-0'
            >
              <div className='md:col-span-5 relative overflow-hidden aspect-[4/3]'>
                <img
                  src={event.image}
                  alt={event.title}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0'
                />
                <div className='absolute top-4 left-4 bg-background px-3 py-1 text-xs font-bold uppercase tracking-widest border border-border'>
                  {event.status}
                </div>
              </div>
              <div className='md:col-span-7 space-y-6'>
                <div className='space-y-2'>
                  <h3 className='font-serif text-3xl font-bold group-hover:text-primary transition-colors'>
                    {event.title}
                  </h3>
                  <p className='text-muted-foreground leading-relaxed'>{event.description}</p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground'>
                  <div className='flex items-center gap-3'>
                    <Calendar className='w-5 h-5 text-primary' />
                    <span>{event.date}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <MapPin className='w-5 h-5 text-primary' />
                    <span>{event.location}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Clock className='w-5 h-5 text-primary' />
                    <span>{event.time}</span>
                  </div>
                </div>

                <div className='pt-4'>
                  <Button
                    asChild
                    size='lg'
                    variant='outline'
                    className='rounded-none border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground font-bold uppercase tracking-widest px-8'
                  >
                    <Link href='/contact'>
                      Register Interest <ArrowRight className='ml-2 w-4 h-4' />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkshopList;
