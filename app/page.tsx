// 'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Compass, Book, Calendar, ShoppingBag, User, Mail } from 'lucide-react';

export default function HomePage() {
  return (
    <main className='min-h-screen'>
      {/* Hero Section - Keep as is */}
      <section className='relative h-screen flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img
            src='/cinematic-nature-scene-with-person-in-meditation-o.jpg'
            alt='Hero background'
            className='w-full h-full object-cover opacity-40'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background' />
        </div>

        <div className='relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8'>
          <h1 className='font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            Create a life worth reliving
          </h1>
          <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200'>
            Where mindset meets manifestation. Realign your mind for peak performance and personal
            evolution.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500'>
            <Button
              asChild
              size='lg'
              className='bg-accent hover:bg-accent/90 text-accent-foreground'
            >
              <Link href='/philosophy'>
                Discover Our Philosophy
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button asChild size='lg' variant='outline'>
              <Link href='/contact'>Start Your Journey</Link>
            </Button>
          </div>
        </div>

        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'>
          <div className='w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2'>
            <div className='w-1 h-3 bg-foreground/30 rounded-full' />
          </div>
        </div>
      </section>

      <section className='py-32 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div className='relative h-[500px] rounded-2xl overflow-hidden group'>
              <img
                src='/person-journaling-at-sunrise-peaceful-moment.jpg'
                alt='Philosophy'
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent' />
            </div>
            <div className='space-y-6'>
              <div className='inline-flex items-center gap-2 text-accent font-medium'>
                <Compass className='h-5 w-5' />
                <span>Philosophy</span>
              </div>
              <h2 className='font-serif text-4xl md:text-5xl font-bold text-balance'>
                Believe. Begin. Breakthrough. Become.
              </h2>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                A proven framework for transformation. Four stages that shift how you think, act,
                and show up.
              </p>
              <Button
                asChild
                size='lg'
                className='bg-primary hover:bg-primary/90 text-primary-foreground group'
              >
                <Link href='/philosophy'>
                  Explore the Framework
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className='py-32 px-6 bg-secondary/30'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center space-y-6 mb-16'>
            <div className='inline-flex items-center gap-2 text-accent font-medium'>
              <Book className='h-5 w-5' />
              <span>Offerings</span>
            </div>
            <h2 className='font-serif text-4xl md:text-6xl font-bold text-balance'>
              Tools for transformation
            </h2>
            <p className='text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
              Books, audio programs, retreats, and masterclasses designed to rewire your mind and
              elevate your life.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 mb-12'>
            <div className='group relative h-64 rounded-xl overflow-hidden'>
              <img
                src='/premium-leather-journal.jpg'
                alt='Books'
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex items-end p-6'>
                <p className='font-serif text-2xl font-bold'>Books</p>
              </div>
            </div>
            <div className='group relative h-64 rounded-xl overflow-hidden'>
              <img
                src='/meditation-audio-headphones.jpg'
                alt='Audio Programs'
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex items-end p-6'>
                <p className='font-serif text-2xl font-bold'>Audio Programs</p>
              </div>
            </div>
            <div className='group relative h-64 rounded-xl overflow-hidden'>
              <img
                src='/ziba-beach-retreat-vision-board-peaceful-setting.jpg'
                alt='Retreats'
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex items-end p-6'>
                <p className='font-serif text-2xl font-bold'>Retreats</p>
              </div>
            </div>
          </div>

          <div className='text-center'>
            <Button
              asChild
              size='lg'
              className='bg-accent hover:bg-accent/90 text-accent-foreground group'
            >
              <Link href='/offerings'>
                View All Offerings
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className='py-32 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6 order-2 md:order-1'>
              <div className='inline-flex items-center gap-2 text-accent font-medium'>
                <Calendar className='h-5 w-5' />
                <span>Events</span>
              </div>
              <h2 className='font-serif text-4xl md:text-5xl font-bold text-balance'>
                Transform in community
              </h2>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                Immersive retreats and masterclasses where breakthrough happens. Join others on the
                path to peak performance.
              </p>
              <Button asChild size='lg' variant='outline' className='group bg-transparent'>
                <Link href='/events'>
                  See Upcoming Events
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
            </div>
            <div className='relative h-[500px] rounded-2xl overflow-hidden group order-1 md:order-2'>
              <img
                src='/ziba-beach-retreat-vision-board-peaceful-setting.jpg'
                alt='Events'
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent' />
            </div>
          </div>
        </div>
      </section>

      <section className='relative py-32 px-6 overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img
            src='/vision-board-materials-kit.jpg'
            alt='Shop'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-background/85' />
        </div>

        <div className='relative z-10 max-w-4xl mx-auto text-center space-y-8'>
          <div className='inline-flex items-center gap-2 text-accent font-medium'>
            <ShoppingBag className='h-5 w-5' />
            <span>Shop</span>
          </div>
          <h2 className='font-serif text-4xl md:text-6xl font-bold text-balance'>
            Invest in your evolution
          </h2>
          <p className='text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
            Curated resources to support your journey. Books, journals, and tools intentionally
            designed for growth.
          </p>
          <Button
            asChild
            size='lg'
            className='bg-primary hover:bg-primary/90 text-primary-foreground group'
          >
            <Link href='/shop'>
              Browse the Shop
              <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </Button>
        </div>
      </section>

      <section className='py-32 px-6 bg-secondary/30'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div className='relative h-[600px] rounded-2xl overflow-hidden group'>
              <img
                src='/professional-portrait-of-confident-coach-sheriff-m.jpg'
                alt='Sheriff Muhammad'
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background/60 to-transparent' />
            </div>
            <div className='space-y-6'>
              <div className='inline-flex items-center gap-2 text-accent font-medium'>
                <User className='h-5 w-5' />
                <span>About</span>
              </div>
              <h2 className='font-serif text-4xl md:text-5xl font-bold text-balance'>
                Meet Sheriff Muhammad
              </h2>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                Founder of Amor Fati. Architect of transformation. Helping individuals and teams
                unlock their full potential.
              </p>
              <Button asChild size='lg' variant='outline' className='group bg-transparent'>
                <Link href='/about'>
                  Learn More
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className='py-32 px-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='relative rounded-3xl border-2 border-accent/20 p-12 md:p-16 text-center space-y-8 overflow-hidden group hover:border-accent/40 transition-colors duration-500'>
            <div className='absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
            <div className='relative z-10'>
              <div className='inline-flex items-center gap-2 text-accent font-medium mb-6'>
                <Mail className='h-5 w-5' />
                <span>Contact</span>
              </div>
              <h2 className='font-serif text-4xl md:text-6xl font-bold text-balance mb-6'>
                Ready to realign?
              </h2>
              <p className='text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8'>
                Your transformation starts with a conversation. Let's talk about where you are and
                where you want to be.
              </p>
              <Button
                asChild
                size='lg'
                className='bg-accent hover:bg-accent/90 text-accent-foreground group'
              >
                <Link href='/contact'>
                  Get in Touch
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Keep centered with subtle animations */}
      <section className='py-32 px-6 bg-accent/5'>
        <div className='max-w-3xl mx-auto text-center space-y-8'>
          <h2 className='font-serif text-4xl md:text-5xl font-bold text-balance'>
            Join our newsletter
          </h2>
          <p className='text-xl text-muted-foreground leading-relaxed'>
            Weekly insights on transformation, philosophy, and living intentionally. No fluff—just
            substance that shifts perspective.
          </p>
          <form className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
            <Input
              type='email'
              placeholder='Enter your email'
              className='flex-1 transition-all duration-300 focus:scale-105'
            />
            <Button
              type='submit'
              size='lg'
              className='bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 hover:scale-105'
            >
              Subscribe
            </Button>
          </form>
          <p className='text-sm text-muted-foreground'>
            Join 10,000+ readers committed to creating a life worth reliving.
          </p>
        </div>
      </section>
    </main>
  );
}
