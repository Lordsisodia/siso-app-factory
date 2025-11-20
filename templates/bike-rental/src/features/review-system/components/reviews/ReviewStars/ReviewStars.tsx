
import React from 'react';
import { Star } from 'lucide-react';

interface ReviewStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showEmpty?: boolean;
}

const ReviewStars: React.FC<ReviewStarsProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  className = '',
  showEmpty = true
}) => {
  // Determine star size
  const starSize = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }[size];

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(maxRating)].map((_, index) => {
        const starFilled = index < Math.floor(rating);
        const starHalf = !starFilled && index < Math.ceil(rating) && rating % 1 !== 0;

        return (
          <span key={index} className="relative">
            {/* Background/empty star */}
            {(showEmpty || starFilled || starHalf) && (
              <Star
                className={`${starSize} ${
                  starFilled || starHalf
                    ? 'text-yellow-400'
                    : 'text-gray-200'
                }`}
                fill={starFilled ? 'currentColor' : 'none'}
              />
            )}

            {/* Half star overlay */}
            {starHalf && (
              <span className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                <Star className={`${starSize} text-yellow-400`} fill="currentColor" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default ReviewStars;
