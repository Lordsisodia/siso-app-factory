import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

export interface ReviewFormProps {
  productName?: string;
  onSubmit: (rating: number, comment?: string) => Promise<void>;
  onCancel?: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  title?: string;
  isSubmitting?: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  productName,
  onSubmit,
  onCancel,
  submitButtonText = 'Submit Review',
  cancelButtonText = 'Cancel',
  title,
  isSubmitting: externalSubmitting
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [internalSubmitting, setInternalSubmitting] = useState(false);

  const submitting = externalSubmitting ?? internalSubmitting;

  const getRatingLabel = (value: number) => {
    if (value === 0) return 'Click to rate';
    if (value === 1) return 'Poor';
    if (value === 2) return 'Fair';
    if (value === 3) return 'Good';
    if (value === 4) return 'Very good';
    return 'Excellent';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      return;
    }

    try {
      setInternalSubmitting(true);
      await onSubmit(rating, comment.trim() || undefined);

      // Reset form
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setInternalSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {title || `Review ${productName ? `your experience with ${productName}` : 'this product'}`}
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Rating *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  disabled={submitting}
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoveredRating ? value <= hoveredRating : value <= rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {getRatingLabel(hoveredRating || rating)}
            </p>
            {rating === 0 && (
              <p className="text-xs text-destructive">Please select a rating</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Comments (optional)
            </label>
            <Textarea
              id="comment"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="resize-none"
              disabled={submitting}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={submitting}
            >
              {cancelButtonText}
            </Button>
          )}
          <Button
            type="submit"
            disabled={submitting || rating === 0}
            className={!onCancel ? 'ml-auto' : ''}
          >
            {submitting ? 'Submitting...' : submitButtonText}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ReviewForm;
