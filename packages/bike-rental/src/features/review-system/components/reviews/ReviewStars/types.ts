export interface ReviewStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showEmpty?: boolean;
}
