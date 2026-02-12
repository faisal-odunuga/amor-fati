import React from 'react';
import { ChevronLeft, ChevronRight, MapPin, Video } from 'lucide-react';
import { Button } from '../../ui/button';

const UpcomingEvents = () => {
  return (
    <section className='py-20 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6'>
          <div>
            <h2 className='text-3xl font-serif font-bold mb-2'>Upcoming Workshops</h2>
            <p className='text-muted-foreground'>
              Secure your spot for our next transformation sessions.
            </p>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' size='icon' className='rounded-lg'>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon' className='rounded-lg'>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          <div className='lg:col-span-8 group relative overflow-hidden rounded-2xl bg-black aspect-[16/9] md:aspect-auto min-h-[500px]'>
            <img
              alt='Main Stage Event'
              className='absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700'
              src='https://lh3.googleusercontent.com/aida-public/AB6AXuDZeyS0IYxCuLINo_SJpDz3pQIIMJ6OVRATQ4ft7OqmqgAjXNZzWVwGnrf_zUvowXH6FzEqaIkqQ-C7MfhzJGtqI4p5628ujKAfejpPpygVnT0c_ieVOWU3XDXAVKg7xb66zZFwVeY7P_mJtcQJQqQAqZuZkjgT-LaGR_i92bCloLPpdBQCde1Q6MmvEAVlWokin9aV9zY1cBRZQl1YjVs08o3XXjIoz0UGfD7t_c3yXzNzzm2b-KYW8EOcZLIjGWK8w_9TwQOosDa5'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent'></div>
            <div className='absolute bottom-0 left-0 p-8 md:p-12 w-full'>
              <div className='flex flex-wrap gap-3 mb-6'>
                <span className='px-4 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase rounded-full'>
                  In-Person & Virtual
                </span>
                <span className='px-4 py-1 bg-white/10 backdrop-blur text-white text-xs font-bold uppercase rounded-full'>
                  Dec 14-19, 2024
                </span>
              </div>
              <h3 className='text-3xl md:text-5xl font-serif font-bold text-white mb-4'>
                Unleash the Power Within
              </h3>
              <p className='text-slate-300 text-lg mb-8 max-w-xl'>
                The signature 4-day experience that will help you break through your limitations and
                take control of your life.
              </p>
              <div className='flex flex-wrap gap-4 items-center'>
                <Button className='bg-primary text-primary-foreground px-8 py-6 rounded-lg font-bold uppercase tracking-wide hover:scale-105 transition-transform hover:brightness-110'>
                  Learn More
                </Button>
                <div className='flex flex-col text-white/70 text-sm'>
                  <span className='font-bold text-white'>Miami, Florida</span>
                  <span>Palm Beach Convention Center</span>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:col-span-4 space-y-4'>
            {[
              {
                type: 'Leadership Academy',
                date: 'Jan 2025',
                title: "The Master's Summit",
                desc: 'Master the core principles of business and personal leadership in this immersive 3-day workshop.',
                location: 'FIJI ISLANDS',
                icon: MapPin,
              },
              {
                type: 'Wealth Mastery',
                date: 'Feb 2025',
                title: 'Financial Freedom Live',
                desc: "Learn the strategies of the world's most successful investors to build your legacy.",
                location: 'GLOBAL VIRTUAL EVENT',
                icon: Video,
              },
              {
                type: 'Business Mastery',
                date: 'Mar 2025',
                title: 'Scale Your Success',
                desc: 'A masterclass in hyper-growth and sustainable business systems.',
                location: 'LONDON, UK',
                icon: MapPin,
              },
            ].map((event, index) => (
              <div
                key={index}
                className='p-6 rounded-2xl bg-background border border-border hover:border-primary transition-colors cursor-pointer group'
              >
                <div className='flex justify-between items-start mb-4'>
                  <span className='text-xs font-bold text-primary uppercase tracking-widest'>
                    {event.type}
                  </span>
                  <span className='text-muted-foreground text-sm'>{event.date}</span>
                </div>
                <h4 className='text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors'>
                  {event.title}
                </h4>
                <p className='text-muted-foreground text-sm mb-4 line-clamp-2'>{event.desc}</p>
                <div className='flex items-center text-xs font-bold gap-2 text-muted-foreground'>
                  <event.icon className='h-4 w-4' />
                  <span>{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
