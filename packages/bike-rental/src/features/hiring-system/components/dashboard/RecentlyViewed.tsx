
import React, { useEffect, useState } from 'react';
import { Car } from '../../types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@siso/ui';
import PopularCarItem from '../carousel/PopularCarItem';
import { Clock } from 'lucide-react';

interface RecentlyViewedProps {
  onCarClick: (car: Car) => void;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ onCarClick }) => {
  const [recentCars, setRecentCars] = useState<Car[]>([]);

  useEffect(() => {
    // Load recently viewed cars from localStorage
    const loadRecentCars = () => {
      const recent = JSON.parse(localStorage.getItem('recentlyViewedCars') || '[]');
      setRecentCars(recent);
    };

    loadRecentCars();

    // Listen for storage events to update the view if changed from another tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'recentlyViewedCars') {
        loadRecentCars();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (recentCars.length === 0) {
    return null; // Don't render anything if there are no recently viewed cars
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Clock className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Recently Viewed</h2>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {recentCars.map((car) => (
              <CarouselItem key={car.id} className="md:basis-1/2 lg:basis-1/3">
                <PopularCarItem car={car} onBookClick={onCarClick} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-6">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default RecentlyViewed;
