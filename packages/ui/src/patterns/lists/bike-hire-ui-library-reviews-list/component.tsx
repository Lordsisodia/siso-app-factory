import React, { useState, useEffect } from 'react';
import { ReviewCard } from '../ReviewCard';
import { ReviewStars } from '../ReviewStars';
import { Separator } from '@/components/ui/separator';
import { MessageSquare } from 'lucide-react';

export interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface ReviewsListProps {
  productId: string;
  fetchReviews: (productId: string) => Promise<Review[]>;
  fetchAverageRating?: (productId: string) => Promise<{ average: number; count: number }>;
  emptyMessage?: string;
  className?: string;
}

export const ReviewsList: React.FC<ReviewsListProps> = ({
  productId,
  fetchReviews,
  fetchAverageRating,
  emptyMessage = "This product doesn't have any reviews yet.",
  className = ''
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const reviewsData = await fetchReviews(productId);
        setReviews(reviewsData);

        if (fetchAverageRating) {
          const ratingData = await fetchAverageRating(productId);
          setAverage(ratingData.average);
          setCount(ratingData.count);
        } else {
          // Calculate from reviews if no fetch function provided
          const avg = reviewsData.length > 0
            ? reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length
            : 0;
          setAverage(avg);
          setCount(reviewsData.length);
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadReviews();
    }
  }, [productId, fetchReviews, fetchAverageRating]);

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Customer Reviews</h2>
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
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
