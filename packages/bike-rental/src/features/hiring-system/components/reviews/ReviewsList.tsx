
import React, { useState, useEffect } from 'react';
import { fetchCarReviews, Review, getCarAverageRating } from '../../utils/reviewUtils';
import ReviewCard from './ReviewCard';
import ReviewStars from './ReviewStars';
import { Separator } from '@siso/ui';
import { MessageSquare } from 'lucide-react';

interface ReviewsListProps {
  carId: string;
  className?: string;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ carId, className = '' }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const [reviewsData, ratingData] = await Promise.all([
          fetchCarReviews(carId),
          getCarAverageRating(carId)
        ]);

        setReviews(reviewsData);
        setAverage(ratingData.average);
        setCount(ratingData.count);
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      loadReviews();
    }
  }, [carId]);

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Guest Reviews</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-3xl font-bold mr-2">{average.toFixed(1)}</span>
            <ReviewStars rating={average} size="lg" />
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="text-muted-foreground">
            {count} {count === 1 ? 'review' : 'reviews'}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse h-32 w-full max-w-lg bg-muted rounded-md"></div>
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/70 mb-4" />
          <h3 className="text-lg font-medium mb-1">No reviews yet</h3>
          <p className="text-muted-foreground">This car doesn't have any reviews yet.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
