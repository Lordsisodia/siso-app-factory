import React from 'react';
import { motion } from 'framer-motion';
import PopularCarCarousel from '../cars/PopularCarCarousel';
import { Car } from '../../types';

interface PopularRentalsProps {
  cars: Car[];
  onCarClick: (car: Car) => void;
}

const PopularRentals: React.FC<PopularRentalsProps> = ({ cars, onCarClick }) => {
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
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center mb-12"
        >
          <motion.span variants={fadeInUp} className="text-accent font-medium mb-2">
            Customer Favorites
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
            Most Popular Rentals
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl">
            Discover the vehicles our customers love the most. These cars consistently deliver exceptional experiences and memories.
          </motion.p>
        </motion.div>

        <PopularCarCarousel cars={cars} onCarClick={onCarClick} />
      </div>
    </section>
  );
};

export default PopularRentals;
