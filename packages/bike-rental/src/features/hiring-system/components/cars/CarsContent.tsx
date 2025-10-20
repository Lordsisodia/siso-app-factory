
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car } from '../../types';
import { Button } from '@siso/ui';
import CarGrid from './CarGrid';
import { Card, CardContent } from '@siso/ui';
import { Car as CarIcon, Filter } from 'lucide-react';
import { cn } from '@siso/ui/lib/utils';
import { addToRecentlyViewed } from '../../utils/viewHistory';

interface CarsContentProps {
  sortedCars: Car[];
  onCarClick: (car: Car) => void;
  filter: string;
  setFilter: (filter: string) => void;
  setSearchTerm: (term: string) => void;
}

const CarsContent: React.FC<CarsContentProps> = ({
  sortedCars,
  onCarClick,
  filter,
  setFilter,
  setSearchTerm
}) => {
  useEffect(() => {
    // When viewing the cars page, add the first few cars to recently viewed
    // This is just to populate the Recently Viewed section initially
    if (sortedCars.length > 0) {
      const firstFew = sortedCars.slice(0, 1);
      firstFew.forEach(car => {
        // We use setTimeout to stagger the additions slightly
        // This is just for demo purposes
        setTimeout(() => {
          addToRecentlyViewed(car);
        }, 500);
      });
    }
  }, []);

  // Create container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // Features categories for popular searches
  const featuredCategories = [
    { name: 'SUV', filter: 'suv', icon: '🚙' },
    { name: 'Luxury', filter: 'luxury', icon: '✨' },
    { name: 'Sports', filter: 'sports', icon: '🏎️' },
    { name: 'Electric', filter: 'electric', icon: '⚡' },
  ];

  // Filter cars by category and search term
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Popular Searches */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {featuredCategories.map((category) => (
            <Card
              key={category.name}
              className={cn(
                "cursor-pointer hover:bg-muted/50 transition-colors border-2",
                filter === category.filter ? "border-primary" : "border-transparent"
              )}
              onClick={() => {
                setFilter(category.filter);
                setSearchTerm('');
              }}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <span className="text-3xl mb-2">{category.icon}</span>
                <h3 className="font-medium">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {sortedCars.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <CarIcon size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">No cars found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find any cars matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setFilter('all');
              setSearchTerm('');
            }}
          >
            Clear Filters
          </Button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Available Cars</h2>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>{sortedCars.length} cars found</span>
            </div>
          </div>

          <CarGrid cars={sortedCars} onCarClick={onCarClick} />
        </motion.div>
      )}
    </div>
  );
};

export default CarsContent;
