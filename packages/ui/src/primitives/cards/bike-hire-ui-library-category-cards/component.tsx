import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export interface Category {
  name: string;
  image: string;
  description?: string;
  href: string;
  count?: number;
}

export interface CategoryCardsProps {
  categories: Category[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  cardHeight?: string;
  showCTA?: boolean;
  ctaText?: string;
  className?: string;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({
  categories,
  columns = { sm: 1, md: 2, lg: 3 },
  cardHeight = 'h-64',
  showCTA = true,
  ctaText = 'Browse Category',
  className
}) => {
  // Animation variants
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
    'grid gap-6',
    `grid-cols-${columns.sm || 1}`,
    `md:grid-cols-${columns.md || 2}`,
    `lg:grid-cols-${columns.lg || 3}`,
    className
  );

  return (
    <motion.div
      className={gridClasses}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {categories.map((category, index) => (
        <motion.div key={index} variants={item}>
          <Link
            to={category.href}
            className={`block group relative ${cardHeight} rounded-2xl overflow-hidden`}
          >
            <div className={cn(
              "absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/90 z-10",
              "group-hover:from-transparent group-hover:via-primary/40 group-hover:to-primary/80 transition-all duration-500"
            )} />

            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-bold text-white mb-2">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-white/90 text-sm mb-4 max-w-[80%]">
                  {category.description}
                </p>
              )}
              {category.count !== undefined && (
                <p className="text-white/80 text-xs mb-3">
                  {category.count} {category.count === 1 ? 'item' : 'items'} available
                </p>
              )}
              {showCTA && (
                <span className="inline-flex items-center text-xs font-medium text-white px-3 py-1.5 bg-accent/90 rounded-full group-hover:bg-accent transition-colors duration-300 group-hover:pr-4">
                  {ctaText}
                  <ArrowRight className="h-3 w-0 ml-0 opacity-0 group-hover:w-3 group-hover:ml-1 group-hover:opacity-100 transition-all duration-300" />
                </span>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryCards;
