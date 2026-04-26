'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils';
import { iconMap, type PlatformNavItem } from '@/lib/book-club/constants';

export function PlatformNav({ 
  items, 
  className,
  style
}: { 
  items: PlatformNavItem[]; 
  className?: string;
  style?: React.CSSProperties;
}) {
  const pathname = usePathname();

  return (
    <div className={className} style={style}>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = iconMap[item.icon];

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'relative flex flex-col items-center justify-center gap-1.5 px-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300',
              active ? 'text-[#d9a517]' : 'text-black/40 hover:text-black',
            )}
          >
            <div className={cn(
              'relative flex items-center justify-center transition-transform duration-300',
              active ? 'scale-110' : 'scale-100'
            )}>
              <Icon className='relative z-10 size-5' />
              {active && (
                <div className='absolute inset-0 size-8 -translate-y-1 rounded-full bg-[#d9a517]/10 blur-md' />
              )}
            </div>
            <span className='z-10'>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
