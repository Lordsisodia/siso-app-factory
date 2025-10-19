import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../../grids/ProductGrid';

export interface FeaturedProductsProps<T = any> {
  products: T[];
  badge?: string;
  heading: string;
  description?: string;
  maxProducts?: number;
  viewAllLink?: string;
  viewAllText?: string;
  renderCard: (product: T) => React.ReactNode;
  backgroundColor?: string;
  className?: string;
}

export function FeaturedProducts<T = any>({
  products,
  badge = 'Featured',
  heading,
  description,
  maxProducts = 6,
  viewAllLink,
  viewAllText = 'View All',
  renderCard,
  backgroundColor = 'bg-background',
  className
}: FeaturedProductsProps<T>) {
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

  const displayProducts = products.slice(0, maxProducts);

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

        <ProductGrid
          products={displayProducts}
          renderCard={(product, index) => renderCard(product)}
          columns={{ sm: 1, md: 2, lg: 3 }}
        />

        {viewAllLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-12"
          >
            <Link
              to={viewAllLink}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-all"
            >
              {viewAllText}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
