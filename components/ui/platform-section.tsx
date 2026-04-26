import { cn } from '@/utils';
import React from 'react';

type PlatformSectionProps = {
  title?: string;
  eyebrow?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function PlatformSection({ 
  title, 
  eyebrow, 
  icon, 
  children, 
  className 
}: PlatformSectionProps) {
  return (
    <section className={cn(
      'rounded-xl border border-black/10 bg-white p-5 shadow-[0_25px_70px_rgba(0,0,0,0.06)] sm:p-6',
      className
    )}>
      {(title || eyebrow || icon) && (
        <div className='flex items-center gap-3 border-b border-black/8 pb-4 mb-6'>
          {icon}
          <div>
            {eyebrow && (
              <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517]'>
                {eyebrow}
              </p>
            )}
            {title && (
              <h3 className={cn(
                'text-black',
                eyebrow ? 'mt-1 text-lg font-serif' : 'text-xs uppercase tracking-[0.3em] text-[#d9a517]'
              )}>
                {title}
              </h3>
            )}
          </div>
        </div>
      )}
      {children}
    </section>
  );
}
