import Image, { type ImageProps } from 'next/image';
import { cn } from '@/utils';

type SiteImageProps = Omit<ImageProps, 'className'> & {
  className?: string;
  containerClassName?: string;
};

export function SiteImage({
  className,
  containerClassName,
  sizes,
  quality = 82,
  ...props
}: SiteImageProps) {
  const resolvedSizes = sizes ?? (props.fill ? '100vw' : undefined);

  if (props.fill) {
    return (
      <div className={cn('relative w-full h-full overflow-hidden', containerClassName)}>
        <Image
          {...props}
          fill
          sizes={resolvedSizes}
          quality={quality}
          className={cn('object-cover', className)}
        />
      </div>
    );
  }

  return (
    <Image
      {...props}
      sizes={resolvedSizes}
      quality={quality}
      className={cn(className)}
    />
  );
}
