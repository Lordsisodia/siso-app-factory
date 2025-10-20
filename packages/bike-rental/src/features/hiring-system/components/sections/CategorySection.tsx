
import React from 'react';
import { motion } from 'framer-motion';
import CategoryCards from './CategoryCards';

interface CategorySectionProps {
  categories: string[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
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

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center mb-12"
        >
          <motion.span variants={fadeInUp} className="text-accent font-medium mb-2">
            Find Your Perfect Ride
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
            Browse By Category
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl">
            Explore our diverse fleet categorized to match your specific needs and preferences, from luxury sedans to powerful SUVs.
          </motion.p>
        </motion.div>

        <CategoryCards categories={categories} />
      </div>
    </section>
  );
};

export default CategorySection;
