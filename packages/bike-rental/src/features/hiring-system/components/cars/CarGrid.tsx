import React from 'react';
import { motion } from 'framer-motion';
import CarCard from './CarCard';
import { Car } from '../../types';
import { cn } from '@siso/ui/lib/utils';

interface CarGridProps {
  cars: Car[];
  onCarClick?: (car: Car) => void;
  className?: string;
}

const CarGrid: React.FC<CarGridProps> = ({ cars, onCarClick, className }) => {
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

  return (
    <motion.div
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", className)}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {cars.map((car) => (
        <motion.div key={car.id} variants={item}>
          <CarCard
            car={car}
            onClick={() => onCarClick?.(car)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CarGrid;
