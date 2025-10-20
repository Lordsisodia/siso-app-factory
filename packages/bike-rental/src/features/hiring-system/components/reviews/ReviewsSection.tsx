
import React from 'react';
import ReviewsList from './ReviewsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@siso/ui';
import { Car } from '../../types/car';

interface ReviewsSectionProps {
  car?: Car;  // Make car optional
  className?: string;
  carId?: string; // Optional prop to support both ways of passing the car ID
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ car, carId, className = '' }) => {
  // Use either the car?.id or the directly provided carId
  // Make sure we have at least one of them
  if (!car && !carId) {
    console.error('ReviewsSection requires either car or carId prop');
    return null;
  }

  const effectiveCarId = carId || car?.id;

  return (
    <div className={`mt-8 ${className}`}>
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          {car && <TabsTrigger value="specs">Specifications</TabsTrigger>}
        </TabsList>

        <TabsContent value="reviews">
          <ReviewsList carId={effectiveCarId} />
        </TabsContent>

        {car && (
          <TabsContent value="specs">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Car Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm text-muted-foreground">Engine</h3>
                  <p className="font-medium">{car.specs.engine}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Speed</h3>
                  <p className="font-medium">{car.specs.speed} mph</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Transmission</h3>
                  <p className="font-medium">{car.specs.transmission}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Seats</h3>
                  <p className="font-medium">{car.specs.seats}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Doors</h3>
                  <p className="font-medium">{car.specs.doors}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Category</h3>
                  <p className="font-medium">{car.category}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ReviewsSection;
