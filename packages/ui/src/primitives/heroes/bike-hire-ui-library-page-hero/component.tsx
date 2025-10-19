import React from 'react';
import { motion } from 'framer-motion';

export interface PageHeroProps {
  heading: string;
  description?: string;
  badge?: string;
  backgroundPattern?: 'grid' | 'dots' | 'waves' | 'none';
  backgroundColor?: string;
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  heading,
  description,
  badge,
  backgroundPattern = 'grid',
  backgroundColor = 'bg-primary text-primary-foreground',
  className = ''
}) => {
  const renderPattern = () => {
    if (backgroundPattern === 'grid') {
      return (
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="page-hero-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="9.5" height="9.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#page-hero-grid)" />
          </svg>
        </div>
      );
    }

    if (backgroundPattern === 'dots') {
      return (
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="page-hero-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#page-hero-dots)" />
          </svg>
        </div>
      );
    }

    return null;
  };

  return (
    <section className={`pt-32 pb-20 ${backgroundColor} relative ${className}`}>
      {renderPattern()}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {badge && (
            <span className="inline-block bg-accent/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h1>
          {description && (
            <p className="text-primary-foreground/80 text-lg">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
