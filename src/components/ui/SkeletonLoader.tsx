// src/components/ui/SkeletonLoader.tsx
interface SkeletonLoaderProps {
  className?: string;
}

export const SkeletonLoader = ({ className }: SkeletonLoaderProps) => {
  return (
    <div
      className={`bg-gray-700 animate-pulse rounded-md ${className}`}
    />
  );
};