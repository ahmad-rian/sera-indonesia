import { Recycle } from 'lucide-react';
import { cn } from '../../lib/utils';

/** Cover photo, or a sage illustrated placeholder when no image is available. */
export function CoverImage({ src, className, width = 900, height = 600 }: { src?: string; className?: string; width?: number; height?: number }) {
  if (!src) {
    return (
      <div aria-hidden className={cn('grid place-items-center bg-sage-strong text-forest', className)}>
        <Recycle className="size-16 opacity-70" strokeWidth={1.25} />
      </div>
    );
  }
  return <img src={src} alt="" loading="lazy" width={width} height={height} className={cn('object-cover', className)} />;
}
