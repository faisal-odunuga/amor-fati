'use client';

import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils';

type PasswordInputProps = React.ComponentProps<typeof Input>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div className='relative'>
        <Input
          ref={ref}
          type={isVisible ? 'text' : 'password'}
          className={cn('pr-12', className)}
          {...props}
        />
        <button
          type='button'
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          onClick={() => setIsVisible((current) => !current)}
          className='absolute right-0 top-0 inline-flex h-full items-center px-4 text-black/45 transition-colors hover:text-black'
        >
          {isVisible ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
