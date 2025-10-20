import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CarGrid from '../cars/CarGrid';
import { Car } from '../../types';

interface FeaturedCarsProps {
  cars: Car[];
  onCarClick: (car: Car) => void;
}

const FeaturedCars: React.FC<FeaturedCarsProps> = ({ cars, onCarClick }) => {
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center mb-12"
        >
          <motion.span variants={fadeInUp} className="text-accent font-medium mb-2">
            Luxury Fleet
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
            Featured Vehicles
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl">
            Experience the thrill of driving the world's finest cars. Our meticulously maintained fleet features the most sought-after luxury and performance vehicles.
          </motion.p>
        </motion.div>

        <CarGrid
          cars={cars.slice(0, 6)}
          onCarClick={onCarClick}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Link
            to="/cars"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-all-medium"
          >
            View All Vehicles
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCars;
