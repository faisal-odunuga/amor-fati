import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center'>
      <div className='relative mb-12'>
        <div className='size-32 rounded-full border border-border flex items-center justify-center bg-secondary/10'>
          <Compass className='size-16 text-muted-foreground/30' />
        </div>
        <div className='absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold uppercase tracking-widest'>
          404 Error
        </div>
      </div>
      
      <h1 className='font-serif text-5xl md:text-7xl text-foreground mb-6'>Lost in the Void</h1>
      <p className='max-w-md text-muted-foreground text-lg mb-10 leading-relaxed'>
        The page you are looking for has been moved or doesn't exist. Not all who wander are lost, but it seems you've reached a dead end.
      </p>
      
      <div className='flex flex-col sm:flex-row gap-4'>
        <Button asChild className='h-12 px-8 rounded-none bg-primary text-primary-foreground hover:opacity-90'>
          <Link href='/'>
            <ArrowLeft className='mr-2 size-4' /> Return to Path
          </Link>
        </Button>
        <Button asChild variant='outline' className='h-12 px-8 rounded-none border-border hover:bg-secondary/50'>
          <Link href='/book-club'>
            Explore Book Club
          </Link>
        </Button>
      </div>
      
      <div className='absolute bottom-12 text-[10px] uppercase tracking-[0.5em] text-muted-foreground/30'>
        Amor Fati · Pursuit of Excellence
      </div>
    </div>
  );
}
