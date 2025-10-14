import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from './ui/logo';

export function Footer() {
  return (
    <footer className='bg-secondary/30 border-t border-border'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          {/* Brand */}
          <div className='space-y-4'>
            <Logo />
            <p className='text-sm text-muted-foreground leading-relaxed'>
              Create a life worth reliving.
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h4 className='font-semibold text-sm'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/about'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/offerings'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Offerings
                </Link>
              </li>
              <li>
                <Link
                  href='/events'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href='/shop'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className='space-y-4'>
            <h4 className='font-semibold text-sm'>Contact</h4>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>amorfatihq@gmail.com</li>
              <li>09061447022</li>
            </ul>
            <div className='flex gap-3 pt-2'>
              <Link
                href='https://www.instagram.com/amorfati.hq/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button variant='ghost' size='icon' className='h-9 w-9'>
                  <Instagram className='h-4 w-4' />
                </Button>
              </Link>
              <Link
                href='https://www.youtube.com/@MohSheriff'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button variant='ghost' size='icon' className='h-9 w-9'>
                  <Youtube className='h-4 w-4' />
                </Button>
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className='space-y-4'>
            <h4 className='font-semibold text-sm'>Join the Circle</h4>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              Weekly insights on confidence, clarity, and creating a life worth reliving.
            </p>
            <form className='flex gap-2'>
              <Input type='email' placeholder='Your email' className='flex-1' />
              <Button type='submit' className='bg-accent hover:bg-accent/90 text-accent-foreground'>
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground'>
          <p>&copy; {new Date().getFullYear()} Amor Fati. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
