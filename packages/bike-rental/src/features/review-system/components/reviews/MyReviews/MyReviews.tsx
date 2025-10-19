import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReviewForm } from '../ReviewForm';
import { Plus } from 'lucide-react';

export interface EligibleBooking {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  startDate: string;
  endDate: string;
}

export interface MyReviewsProps {
  fetchEligibleBookings: () => Promise<EligibleBooking[]>;
  onReviewSubmit: (bookingId: string, productId: string, rating: number, comment?: string) => Promise<void>;
  onReviewSuccess?: () => void;
  className?: string;
}

export const MyReviews: React.FC<MyReviewsProps> = ({
  fetchEligibleBookings,
  onReviewSubmit,
  onReviewSuccess,
  className = ''
}) => {
  const [eligibleBookings, setEligibleBookings] = useState<EligibleBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<EligibleBooking | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const bookings = await fetchEligibleBookings();
      setEligibleBookings(bookings);
    } catch (error) {
      console.error('Error fetching eligible bookings:', error);
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
    if (onReviewSuccess) {
      onReviewSuccess();
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {selectedBooking ? (
        <ReviewForm
          productName={selectedBooking.productName}
          onSubmit={async (rating, comment) => {
            await onReviewSubmit(selectedBooking.id, selectedBooking.productId, rating, comment);
            handleReviewSuccess();
          }}
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
                      {booking.productImage && (
                        <img
                          src={booking.productImage}
                          alt={booking.productName}
                          className="h-24 w-24 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <CardTitle className="text-base">
                          {booking.productName}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
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
