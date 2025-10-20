
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@siso/ui';
import { Button } from '@siso/ui';
import { useToast } from '@siso/ui/hooks/use-toast';
import { fetchEligibleBookingsForReview } from '../../utils/reviewUtils';
import ReviewForm from './ReviewForm';
import { Plus } from 'lucide-react';

interface EligibleBooking {
  id: string;
  car_id: string;
  start_date: string;
  end_date: string;
  cars: {
    id: string;
    name: string;
    brand: string;
    image: string;
  };
}

const MyReviews: React.FC = () => {
  const [eligibleBookings, setEligibleBookings] = useState<EligibleBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<EligibleBooking | null>(null);
  const { toast } = useToast();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const bookings = await fetchEligibleBookingsForReview();
      setEligibleBookings(bookings);
    } catch (error) {
      console.error('Error fetching eligible bookings:', error);
      toast({
        title: "Failed to load bookings",
        description: "There was an error loading your eligible bookings for review.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleReviewSuccess = () => {
    setSelectedBooking(null);
    fetchBookings();
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="space-y-6">
      {selectedBooking ? (
        <ReviewForm
          bookingId={selectedBooking.id}
          carId={selectedBooking.cars.id}
          carName={`${selectedBooking.cars.brand} ${selectedBooking.cars.name}`}
          onSuccess={handleReviewSuccess}
          onCancel={() => setSelectedBooking(null)}
        />
      ) : (
        <>
          <h2 className="text-2xl font-semibold">My Reviews</h2>

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-muted h-24 rounded-lg"></div>
              ))}
            </div>
          ) : eligibleBookings.length > 0 ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                You have {eligibleBookings.length} {eligibleBookings.length === 1 ? 'booking' : 'bookings'} eligible for review.
              </p>

              {eligibleBookings.map(booking => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="flex items-center">
                      <img
                        src={booking.cars.image}
                        alt={booking.cars.name}
                        className="h-24 w-24 object-cover"
                      />
                      <div className="p-4">
                        <CardTitle className="text-base">
                          {booking.cars.brand} {booking.cars.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Review
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-muted/30 p-8 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-1">No bookings to review</h3>
              <p className="text-muted-foreground">
                You don't have any completed bookings that need reviews.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyReviews;
