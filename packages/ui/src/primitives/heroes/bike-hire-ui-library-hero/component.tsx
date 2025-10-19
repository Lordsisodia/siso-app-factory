import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface HeroImage {
  url: string;
  alt: string;
}

export interface HeroButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export interface HeroProps {
  images: HeroImage[];
  badge?: string;
  heading: string;
  subheading: string;
  buttons?: HeroButton[];
  autoPlayInterval?: number;
  showIndicators?: boolean;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  images,
  badge,
  heading,
  subheading,
  buttons = [],
  autoPlayInterval = 6000,
  showIndicators = true,
  className
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval]);

  return (
    <section className={cn("relative h-screen w-full overflow-hidden", className)}>
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            currentImageIndex === index ? "opacity-100" : "opacity-0"
          )}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/90 z-10" />
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-6 h-full flex flex-col justify-center items-start relative z-20">
        <div className="max-w-2xl">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block bg-accent/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-4"
          >
            {heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/90 text-lg md:text-xl mb-8 max-w-lg"
          >
            {subheading}
          </motion.p>

          {buttons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {buttons.map((button, index) => (
                <Link
                  key={index}
                  to={button.href}
                  className={cn(
                    "px-6 py-3 rounded-md text-base font-medium transition-all",
                    button.variant === 'secondary'
                      ? "bg-transparent hover:bg-white/10 text-white border border-white/30"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  )}
                >
                  {button.label}
                </Link>
              ))}
            </motion.div>
          )}
        </div>

        {/* Image Navigation Indicators */}
        {showIndicators && images.length > 1 && (
          <div className="absolute bottom-12 left-6 flex space-x-2 z-30">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-12 h-1 rounded transition-all",
                  currentImageIndex === index
                    ? "bg-white"
                    : "bg-white/30 hover:bg-white/50"
                )}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
