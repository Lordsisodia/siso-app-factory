import React from 'react';
import { CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

export interface CarouselControlsProps {
  className?: string;
  buttonClassName?: string;
}

export const CarouselControls: React.FC<CarouselControlsProps> = ({
  className = '',
  buttonClassName = ''
}) => {
  return (
    <div className={`flex justify-center mt-8 space-x-4 ${className}`}>
      <CarouselPrevious className={`relative static left-0 translate-y-0 -translate-x-0 ${buttonClassName}`} />
      <CarouselNext className={`relative static right-0 translate-y-0 -translate-x-0 ${buttonClassName}`} />
    </div>
  );
};

export default CarouselControls;
