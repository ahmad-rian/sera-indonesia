import { Skeleton } from '../ui/Skeleton';

export function PageFallback() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 sm:px-6" aria-busy="true">
      <Skeleton className="h-14 w-2/3" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-72 w-full rounded-hero" />
    </div>
  );
}
