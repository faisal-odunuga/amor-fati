import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ShopPage() {
  const products = [
    {
      id: 1,
      name: '(HARD COPY) 11 Letters I Wrote, but never sent',
      description: `A hard copy of my book, 11 Letters I Wrote, but never sent: Don't pick be both RICH and HAPPY - Screw the OR.`,
      price: '₦11,500',
      image: '/11-letters-i-wrote-hard-copy.jpeg',
      link: 'https://selar.com/11LETTERSBOOK',
    },
    {
      id: 2,
      name: '(PDF E-BOOK) 11 Letters I Wrote, but never sent',
      description: `A soft copy of my book, 11 Letters I Wrote, but never sent: Don't pick be both RICH and HAPPY - Screw the OR.`,
      price: '₦7,500',
      image: '/11-letters-i-wrote-soft-copy.jpeg',
      link: 'https://selar.com/11letterspdf',
    },
    {
      id: 3,
      name: '(Pre Order) The Overconfidence 101 Masterclass',
      description:
        'A pre-order for my Masterclass, The Overconfidence 101. The expected release date is Dec 2, 2025 4:00 AM',
      price: '₦20,000',
      image: '/overconfidence-101.jpg',
    },
  ];

  return (
    <main className='min-h-screen pt-20'>
      {/* Hero Section */}
      <section className='py-24 px-6'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <h1 className='font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance'>
            Shop
          </h1>
          <p className='text-xl text-muted-foreground leading-relaxed'>
            Tools and resources to support your journey of transformation.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className='py-16 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {products.map((product) => (
              <Card key={product.id} className='border-border overflow-hidden group'>
                <div className='relative aspect-square bg-muted overflow-hidden'>
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <CardHeader>
                  <CardTitle className='font-serif text-2xl'>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground leading-relaxed'>{product.description}</p>
                </CardContent>
                <CardFooter className='flex items-center justify-between'>
                  <span className='text-2xl font-bold text-accent'>{product.price}</span>
                  <Button size='sm' className='bg-accent hover:bg-accent/90 text-accent-foreground'>
                    <ShoppingCart className='mr-2 h-4 w-4' />
                    <a href={product.link}> Order Now</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className='py-24 px-6 bg-secondary/30'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <h2 className='font-serif text-3xl md:text-4xl font-bold'>More Coming Soon</h2>
          <p className='text-lg text-muted-foreground leading-relaxed'>
            We're constantly creating new tools and resources to support your transformation. Join
            our newsletter to be the first to know about new releases.
          </p>
          <div className='pt-6'>
            <Button asChild size='lg' variant='outline'>
              <Link href='/journal'>
                Subscribe to Newsletter
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className='py-16 px-6'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='text-sm text-muted-foreground'>
            All products are currently available for pre-order. Shipping within Lagos and nationwide
            delivery available.
          </p>
        </div>
      </section>
    </main>
  );
}
