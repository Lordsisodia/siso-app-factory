import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface CallToActionProps {
  heading: string;
  description?: string;
  buttonLabel: string;
  buttonHref: string;
  backgroundPattern?: 'grid' | 'dots' | 'none';
  backgroundColor?: string;
  className?: string;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  heading,
  description,
  buttonLabel,
  buttonHref,
  backgroundPattern = 'grid',
  backgroundColor = 'bg-primary text-primary-foreground',
  className
}) => {
  const renderPattern = () => {
    if (backgroundPattern === 'grid') {
      return (
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="cta-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="9.5" height="9.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
      );
    }

    if (backgroundPattern === 'dots') {
      return (
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="cta-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cta-dots)" />
          </svg>
        </div>
      );
    }

    return null;
  };

  return (
    <section className={`py-24 ${backgroundColor} relative overflow-hidden ${className}`}>
      {renderPattern()}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {heading}
          </h2>
          {description && (
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          <Link
            to={buttonHref}
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-md text-base font-medium transition-all inline-block"
          >
            {buttonLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
