import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { siteMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { testimonials } from '@/lib/data';
import Image from 'next/image';

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'Testimonials',
  description:
    'Testimonials — Hear from those who have experienced transformation through Amor Fati tools and resources.',
};

export default function TestimonialsPage() {
  return (
    <main className='min-h-screen pt-20'>
      {/* Hero Section */}
      <section className='py-24 px-6'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <h1 className='font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance'>
            Testimonials
          </h1>
          <p className='text-xl text-muted-foreground leading-relaxed'>
            Real stories from people who have found growth, balance, and transformation through our
            work.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className='py-16 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className='border-border overflow-hidden group'>
                <div className='relative aspect-square bg-muted overflow-hidden'>
                  <Image
                    src={testimonial.image || '/placeholder.svg'}
                    alt={testimonial.name}
                    width={400}
                    height={400}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <CardHeader>
                  <CardTitle className='font-serif text-2xl text-center'>
                    {testimonial.name}
                  </CardTitle>
                  {testimonial.title && (
                    <p className='text-sm text-muted-foreground text-center'>{testimonial.title}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground leading-relaxed italic text-center'>
                    “{testimonial.quote}”
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className='py-24 px-6 bg-secondary/30'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <h2 className='font-serif text-3xl md:text-4xl font-bold'>Your Story Could Be Next</h2>
          <p className='text-lg text-muted-foreground leading-relaxed'>
            Join the growing community transforming their mindset through Amor Fati tools and
            experiences.
          </p>
        </div>
      </section>
    </main>
  );
}
