import React from 'react';

export interface SkeletonLoaderProps {
  variant?: 'card' | 'list' | 'detail' | 'text' | 'avatar' | 'custom';
  count?: number;
  className?: string;
  children?: React.ReactNode;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'card',
  count = 1,
  className = '',
  children
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
            <div className="animate-pulse space-y-4">
              <div className="h-48 bg-muted rounded-md"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-8 bg-muted rounded w-20"></div>
                <div className="h-8 bg-muted rounded w-24"></div>
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className={`bg-white rounded-lg p-4 ${className}`}>
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-muted h-12 w-12 flex-shrink-0"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          </div>
        );

      case 'detail':
        return (
          <div className={`${className}`}>
            <div className="animate-pulse space-y-6">
              <div className="h-96 bg-muted rounded-lg"></div>
              <div className="space-y-3">
                <div className="h-8 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-muted rounded"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className={`animate-pulse space-y-2 ${className}`}>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </div>
        );

      case 'avatar':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="rounded-full bg-muted h-12 w-12"></div>
          </div>
        );

      case 'custom':
        return children || null;

      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
