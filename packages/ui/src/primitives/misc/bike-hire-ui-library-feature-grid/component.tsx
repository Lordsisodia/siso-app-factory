import React from 'react';
import { motion } from 'framer-motion';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  badge?: string;
  heading: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  backgroundColor?: 'primary' | 'secondary' | 'background';
  className?: string;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  badge,
  heading,
  description,
  features,
  columns = 3,
  backgroundColor = 'secondary',
  className
}) => {
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const bgColorClass = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary',
    background: 'bg-background'
  }[backgroundColor];

  const gridCols = {
    2: 'md:grid-cols-2 lg:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  return (
    <section className={`py-20 ${bgColorClass} ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center mb-12"
        >
          {badge && (
            <motion.span variants={fadeInUp} className="text-accent font-medium mb-2">
              {badge}
            </motion.span>
          )}
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
            {heading}
          </motion.h2>
          {description && (
            <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl">
              {description}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={`grid grid-cols-1 ${gridCols} gap-8`}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;
