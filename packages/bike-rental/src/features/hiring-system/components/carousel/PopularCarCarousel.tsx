
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@siso/ui';
import { Car } from '../../types';
import PopularCarItem from './PopularCarItem';
import CarouselControls from './CarouselControls';
import { getPopularCars } from '../../utils/carUtils';

interface PopularCarCarouselProps {
  cars: Car[];
  onCarClick: (car: Car) => void;
}

const PopularCarCarousel: React.FC<PopularCarCarouselProps> = ({ cars, onCarClick }) => {
  // Get popular cars using our utility function
  const popularCars = getPopularCars(cars, 5);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {popularCars.map((car) => (
          <CarouselItem key={car.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <PopularCarItem car={car} onBookClick={onCarClick} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselControls />
    </Carousel>
  );
};

export default PopularCarCarousel;
