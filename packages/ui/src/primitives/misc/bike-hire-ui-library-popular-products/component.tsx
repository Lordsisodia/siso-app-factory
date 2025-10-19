import React from 'react';
import { motion } from 'framer-motion';

export interface PopularProductsProps<T = any> {
  products: T[];
  badge?: string;
  heading: string;
  description?: string;
  renderCarousel: (products: T[]) => React.ReactNode;
  backgroundColor?: string;
  className?: string;
}

export function PopularProducts<T = any>({
  products,
  badge = 'Customer Favorites',
  heading,
  description,
  renderCarousel,
  backgroundColor = 'bg-secondary/20',
  className = ''
}: PopularProductsProps<T>) {
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

  return (
    <section className={`py-20 ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center mb-12"
        >
          <motion.span variants={fadeInUp} className="text-accent font-medium mb-2">
            {badge}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
            {heading}
          </motion.h2>
          {description && (
            <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl">
              {description}
            </motion.p>
          )}
        </motion.div>

        {renderCarousel(products)}
      </div>
    </section>
  );
}

export default PopularProducts;
