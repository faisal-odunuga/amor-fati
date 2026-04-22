'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/book-club/logout-button';
import { cn } from '@/utils';
import type { PlatformNavItem } from '@/lib/book-club/constants';
import { iconMap } from '@/lib/book-club/constants';

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
  accentLabel,
  homeHref,
  children,
}: PlatformShellProps) {
  const pathname = usePathname();

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <div className='border-b border-border bg-secondary/30 px-6 py-3'>
        <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground'>
          <span>{eyebrow}</span>
          <span className='hidden sm:inline'>{accentLabel}</span>
        </div>
      </div>

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

          <div className='hidden items-center gap-3 lg:flex'>
            {items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              const Icon = iconMap[item.icon];

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-medium leading-tight',
                    active ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  <Icon className='size-5' />
                  <span className='max-w-[72px] text-center'>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className='flex items-center gap-3'>
            <div className='hidden text-right md:block'>
              <p className='text-[11px] font-bold uppercase tracking-[0.3em] text-primary'>
                Signed In
              </p>
              <p className='mt-1 text-sm text-foreground/70'>{profileName}</p>
            </div>
            <div className='md:block'>
              <LogoutButton />
            </div>
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
        <section className='border-b border-border bg-secondary/20 px-6 py-14'>
          <div className='mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between'>
            <div className='max-w-3xl'>
              <p className='mb-4 text-sm font-bold uppercase tracking-[0.4em] text-primary'>
                {eyebrow}
              </p>
              <h2 className='font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl'>
                {title}
              </h2>
            </div>
            <p className='max-w-xl text-sm leading-7 text-muted-foreground'>
              A premium accountability layer for people who intend to become visibly different
              through action.
            </p>
          </div>
        </section>

        <section className='px-6 py-12 pb-28 sm:py-16 sm:pb-16'>
          <div className='mx-auto max-w-7xl'>{children}</div>
        </section>
      </main>

      <nav className='fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md lg:hidden'>
        <div
          className='mx-auto grid max-w-7xl items-center px-2 pb-[max(env(safe-area-inset-bottom),0px)] pt-2'
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = iconMap[item.icon];

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-medium leading-tight',
                  active ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <Icon className='size-5' />
                <span className='max-w-[72px] text-center'>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
