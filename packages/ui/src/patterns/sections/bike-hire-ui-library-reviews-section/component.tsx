import React from 'react';
import { ReviewsList } from '../ReviewsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SpecsGrid, Spec } from '../../grids/SpecsGrid';

export interface ReviewsSectionProps {
  productId: string;
  fetchReviews: (productId: string) => Promise<any[]>;
  fetchAverageRating?: (productId: string) => Promise<{ average: number; count: number }>;
  specs?: Spec[];
  showSpecsTab?: boolean;
  specsTitle?: string;
  className?: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  productId,
  fetchReviews,
  fetchAverageRating,
  specs,
  showSpecsTab = false,
  specsTitle = 'Specifications',
  className = ''
}) => {
  if (!productId) {
    console.error('ReviewsSection requires productId prop');
    return null;
  }

  return (
    <div className={`mt-8 ${className}`}>
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          {showSpecsTab && specs && <TabsTrigger value="specs">Specifications</TabsTrigger>}
        </TabsList>

        <TabsContent value="reviews">
          <ReviewsList
            productId={productId}
            fetchReviews={fetchReviews}
            fetchAverageRating={fetchAverageRating}
          />
        </TabsContent>

        {showSpecsTab && specs && (
          <TabsContent value="specs">
            <SpecsGrid
              title={specsTitle}
              specs={specs}
              cardClassName="bg-muted/30"
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ReviewsSection;
