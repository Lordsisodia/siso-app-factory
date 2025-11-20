import React, { useState } from 'react';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800';

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  showSkeleton?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallback = DEFAULT_FALLBACK_IMAGE,
  className,
  showSkeleton = true,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    setError(true);
    e.currentTarget.src = fallback;
  };

  return (
    <div className="relative">
      {isLoading && showSkeleton && (
        <div className={`absolute inset-0 ${className} bg-muted animate-pulse`} />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading="lazy"
        {...rest}
      />
    </div>
  );
};

export default ImageWithFallback;
