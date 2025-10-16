'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './ui/logo';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/offerings', label: 'Offerings' },
    { href: '/philosophy', label: 'Philosophy' },
    { href: '/events', label: 'Events' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/journal', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className='sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <Logo />

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-sm text-foreground/70 hover:text-foreground transition-colors'
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className='md:hidden border-t border-border bg-background'>
          <div className='px-6 py-4 space-y-4'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='block text-foreground/70 hover:text-foreground transition-colors'
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
