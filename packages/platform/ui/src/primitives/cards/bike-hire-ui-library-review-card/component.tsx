import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { User } from 'lucide-react';
import { ReviewStars } from '../ReviewStars';

export interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface ReviewCardProps {
  review: Review;
  className?: string;
  showAvatar?: boolean;
  avatarUrl?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  className = '',
  showAvatar = true,
  avatarUrl
}) => {
  const createdAt = new Date(review.created_at);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Card className={`border-border/40 ${className}`}>
      <CardContent className="pt-6 pb-2">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {showAvatar && (
              <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center mr-2 overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={review.user_name} className="w-full h-full object-cover" />
                ) : (
                  <User className="h-5 w-5 text-secondary-foreground" />
                )}
              </div>
            )}
            <div>
              <h3 className="font-medium text-sm">{review.user_name}</h3>
              <ReviewStars rating={review.rating} size="sm" />
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>

        {review.comment && (
          <div className="text-sm text-foreground/90 mt-2">
            <p>{review.comment}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 pb-4">
        <div className="w-full flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }).format(createdAt)}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
