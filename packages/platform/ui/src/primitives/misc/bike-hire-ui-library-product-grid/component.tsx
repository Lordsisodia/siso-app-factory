import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ProductGridProps<T = any> {
  products: T[];
  renderCard: (product: T, index: number) => React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: number;
  animated?: boolean;
  className?: string;
}

export function ProductGrid<T = any>({
  products,
  renderCard,
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 6,
  animated = true,
  className
}: ProductGridProps<T>) {
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const gridClasses = cn(
    'grid',
    `grid-cols-${columns.sm || 1}`,
    `md:grid-cols-${columns.md || 2}`,
    `lg:grid-cols-${columns.lg || 3}`,
    `gap-${gap}`,
    className
  );

  if (!animated) {
    return (
      <div className={gridClasses}>
        {products.map((product, index) => (
          <div key={index}>
            {renderCard(product, index)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={gridClasses}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {products.map((product, index) => (
        <motion.div key={index} variants={item}>
          {renderCard(product, index)}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ProductGrid;
