'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/book-club/logout-button';
import { cn } from '@/utils';
import { PlatformNav } from './platform-nav';
import { type PlatformNavItem } from '@/lib/book-club/constants';

type PlatformShellProps = {
  title: string;
  eyebrow: string;
  profileName: string;
  items: PlatformNavItem[];
  accentLabel: string;
  homeHref: string;
  children: React.ReactNode;
};

export function PlatformShell({
  title,
  eyebrow,
  profileName,
  items,
  homeHref,
  children,
}: PlatformShellProps) {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <header className='sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md'>
        <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5'>
          <div className='flex items-center gap-4'>
            <Logo />
            <div className='hidden border-l border-border pl-4 md:block'>
              <p className='text-[11px] font-bold uppercase tracking-[0.32em] text-primary'>
                {eyebrow}
              </p>
              <h1 className='mt-1 font-serif text-2xl text-foreground'>{title}</h1>
            </div>
          </div>

          <PlatformNav items={items} className='hidden items-center gap-3 lg:flex' />

          <div className='flex items-center gap-3'>
            <div className='hidden text-right md:block'>
              <p className='text-[11px] font-bold uppercase tracking-[0.3em] text-primary'>
                Signed In
              </p>
              <p className='mt-1 text-sm text-foreground/70'>{profileName}</p>
            </div>
            <LogoutButton />
            <Button
              asChild
              variant='outline'
              className='hidden rounded-none border-primary/30 bg-primary/5 md:inline-flex'
            >
              <Link href={homeHref}>Main Site</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className='px-4 py-8 pb-28 sm:px-6 sm:py-12 sm:pb-16 lg:py-16'>
          <div className='mx-auto max-w-7xl'>{children}</div>
        </section>
      </main>

      <nav className='fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md lg:hidden'>
        <PlatformNav 
          items={items} 
          className='mx-auto grid max-w-7xl items-center px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2'
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        />
      </nav>
    </div>
  );
}
