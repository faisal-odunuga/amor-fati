import { Card, CardContent } from '@/components/ui/card';
import { siteMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'About | Amor Fati',
  description: 'Discover the story and philosophy behind Amor Fati and Sheriff Muhammad.',
};

export default function AboutPage() {
  return (
    <main className='min-h-screen pt-20'>
      {/* Hero Section */}
      <section className='py-24 px-6'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <h1 className='font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance'>
            About Amor Fati
          </h1>
          <p className='text-xl text-muted-foreground leading-relaxed'>
            Love of fate. Embrace of destiny.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className='py-16 px-6 bg-secondary/30'>
        <div className='max-w-5xl mx-auto space-y-12'>
          <div className='space-y-6'>
            <h2 className='font-serif text-3xl md:text-4xl font-bold'>The Story</h2>
            <div className='prose prose-lg max-w-none space-y-4 text-muted-foreground leading-relaxed'>
              <p>
                Amor Fati is a Latin phrase meaning "love of fate". It represents the profound
                acceptance and embrace of everything that happens in life, both good and
                challenging.
              </p>
              <p>
                We believe that true transformation begins not with changing external circumstances,
                but with realigning your internal world. Your mindset creates your reality. Your
                beliefs shape your destiny.
              </p>
              <p>
                At Amor Fati, we guide individuals and teams through the journey of mental
                realignment, helping them unlock their highest potential and create lives worth
                reliving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className='py-24 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div className='relative aspect-[3/4] bg-muted rounded-lg overflow-hidden'>
              <img
                src='/moh-sheriff.jpeg'
                alt='Sheriff Muhammad'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='space-y-6'>
              <h2 className='font-serif text-3xl md:text-4xl font-bold'>Meet the Founder</h2>
              <div className='space-y-4 text-muted-foreground leading-relaxed'>
                <p>
                  Sheriff Muhammad is the founder of Amor Fati, a human potential teacher and
                  confidence coach. His work explores mindset, manifestation, and the psychology of
                  high performance.
                </p>
                <p>
                  As a Youth Ambassador for the Lagos State Government, Sheriff combines
                  philosophical wisdom with practical strategies to help individuals and
                  organizations achieve breakthrough results.
                </p>
                <p>
                  His approach is grounded in the belief that confidence is not built, it's
                  uncovered. That clarity is not found, it's created. And that the life you want is
                  not out there, it's within you, waiting to be realized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-24 px-6 bg-secondary/30'>
        <div className='max-w-6xl mx-auto space-y-12'>
          <h2 className='font-serif text-3xl md:text-4xl font-bold text-center'>Our Core Values</h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              {
                title: 'Growth',
                description:
                  'Continuous evolution through intentional practice and self-awareness.',
              },
              {
                title: 'Clarity',
                description: 'Mental precision that cuts through noise and reveals truth.',
              },
              {
                title: 'Confidence',
                description: 'Unshakeable self-belief rooted in authentic self-knowledge.',
              },
              {
                title: 'Alignment',
                description: 'Harmony between your inner world and outer reality.',
              },
            ].map((value) => (
              <Card key={value.title} className='border-none shadow-none bg-background'>
                <CardContent className='p-6 space-y-3'>
                  <h3 className='font-serif text-2xl font-bold'>{value.title}</h3>
                  <p className='text-muted-foreground leading-relaxed'>{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className='py-24 px-6'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <blockquote className='font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-balance'>
            "We don't fix people. We realign them."
          </blockquote>
        </div>
      </section>
    </main>
  );
}
