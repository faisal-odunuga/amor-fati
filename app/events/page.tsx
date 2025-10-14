import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { siteMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'Events & Experiences',
  description:
    'Join Amor Fati events like the Realign Vision Board Retreat at Ziba Beach and Overconfidence 101 Masterclasses. Step into clarity and alignment.',
};

export default function EventsPage() {
  return (
    <main className='min-h-screen pt-20'>
      {/* Hero Section */}
      <section className='py-24 px-6'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <h1 className='font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance'>
            Events & Experiences
          </h1>
          <p className='text-xl text-muted-foreground leading-relaxed'>
            Immersive transformations. Your next chapter starts here.
          </p>
        </div>
      </section>

      {/* Featured Event */}
      <section className='py-16 px-6 bg-secondary/30'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div className='relative aspect-[4/3] bg-muted rounded-lg overflow-hidden'>
              <img
                src='/ziba-beach-retreat-vision-board-peaceful-setting.jpg'
                alt='Realign Vision Board Retreat at Ziba Beach'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='space-y-6'>
              <div className='inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium'>
                Featured Event
              </div>
              <h2 className='font-serif text-3xl md:text-4xl font-bold'>
                Realign Vision Board Retreat
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                An immersive day of clarity, creativity, and realignment at the serene Ziba Beach.
                Create a powerful visual representation of your future while connecting with
                like-minded individuals on the path to transformation.
              </p>
              <div className='space-y-3'>
                <div className='flex items-center gap-3 text-muted-foreground'>
                  <MapPin className='h-5 w-5 text-accent' />
                  <span>Ziba Beach, Lagos</span>
                </div>
                <div className='flex items-center gap-3 text-muted-foreground'>
                  <Calendar className='h-5 w-5 text-accent' />
                  <span>Next date to be announced</span>
                </div>
                <div className='flex items-center gap-3 text-muted-foreground'>
                  <Users className='h-5 w-5 text-accent' />
                  <span>Limited to 30 participants</span>
                </div>
              </div>
              <Button size='lg' className='bg-accent hover:bg-accent/90 text-accent-foreground'>
                Join the Waitlist
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className='py-24 px-6'>
        <div className='max-w-6xl mx-auto space-y-12'>
          <div className='text-center space-y-4'>
            <h2 className='font-serif text-3xl md:text-4xl font-bold'>What to Expect</h2>
            <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
              The Realign Vision Board Retreat is more than an event — it's a transformative
              experience.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                title: 'Clarity Session',
                description:
                  'Guided exercises to help you gain crystal-clear vision on what you truly want and why it matters.',
              },
              {
                title: 'Creative Workshop',
                description:
                  'Hands-on vision board creation using powerful visualization techniques and premium materials.',
              },
              {
                title: 'Community Connection',
                description:
                  'Connect with ambitious, growth-minded individuals who are also committed to creating lives worth reliving.',
              },
            ].map((item) => (
              <Card key={item.title} className='border-none shadow-none bg-secondary/30'>
                <CardHeader>
                  <CardTitle className='font-serif text-2xl'>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground leading-relaxed'>{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className='py-24 px-6 bg-secondary/30'>
        <div className='max-w-6xl mx-auto space-y-12'>
          <div className='text-center space-y-4'>
            <h2 className='font-serif text-3xl md:text-4xl font-bold'>Past Experiences</h2>
            <p className='text-lg text-muted-foreground'>
              Moments of transformation and connection.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className='relative aspect-square bg-muted rounded-lg overflow-hidden'>
                <img
                  src={`/vision-board-retreat-participants-.jpg?height=400&width=400&query=vision board retreat participants ${i}`}
                  alt={`Past event ${i}`}
                  className='w-full h-full object-cover'
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-24 px-6'>
        <div className='max-w-6xl mx-auto space-y-12'>
          <h2 className='font-serif text-3xl md:text-4xl font-bold text-center'>
            What Participants Say
          </h2>

          <div className='grid md:grid-cols-2 gap-8'>
            {[
              {
                quote:
                  "The Realign Retreat gave me the clarity I'd been searching for. I left with not just a vision board, but a clear roadmap for my next chapter.",
                author: 'Chioma A.',
                role: 'Entrepreneur',
              },
              {
                quote:
                  "Sheriff's guidance helped me see possibilities I couldn't see before. This experience was exactly what I needed to break through my mental barriers.",
                author: 'Tunde O.',
                role: 'Creative Director',
              },
            ].map((testimonial) => (
              <Card key={testimonial.author} className='border-border'>
                <CardContent className='p-8 space-y-4'>
                  <p className='text-lg text-muted-foreground leading-relaxed italic'>
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className='font-semibold'>{testimonial.author}</p>
                    <p className='text-sm text-muted-foreground'>{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Masterclasses */}
      <section className='py-24 px-6 bg-secondary/30'>
        <div className='max-w-6xl mx-auto space-y-12'>
          <div className='text-center space-y-4'>
            <h2 className='font-serif text-3xl md:text-4xl font-bold'>
              Overconfidence 101 Masterclasses
            </h2>
            <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
              90-minute transformative sessions for teams, schools, and organizations. Book a
              masterclass for your group.
            </p>
          </div>

          <div className='text-center'>
            <Button
              asChild
              size='lg'
              className='bg-accent hover:bg-accent/90 text-accent-foreground'
            >
              <Link href='/contact'>
                Book a Masterclass
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 px-6'>
        <div className='max-w-3xl mx-auto text-center space-y-6'>
          <h2 className='font-serif text-3xl md:text-4xl font-bold'>
            Your next chapter starts here
          </h2>
          <p className='text-lg text-muted-foreground leading-relaxed'>
            Join us for an experience that will shift your perspective and realign your path.
          </p>
          <div className='pt-6'>
            <Button asChild size='lg' variant='outline'>
              <Link href='/contact'>Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
