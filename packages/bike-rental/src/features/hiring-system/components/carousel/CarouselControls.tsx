
import React from 'react';
import { CarouselPrevious, CarouselNext } from '@siso/ui';

const CarouselControls: React.FC = () => {
  return (
    <div className="flex justify-center mt-8 space-x-4">
      <CarouselPrevious className="relative static left-0 translate-y-0 -translate-x-0" />
      <CarouselNext className="relative static right-0 translate-y-0 -translate-x-0" />
    </div>
  );
};

export default CarouselControls;
