import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from 'lucide-react';
import { ReviewStars } from '../../reviews/ReviewStars';
import { Link } from 'react-router-dom';

export interface ProductSpec {
  label: string;
  value: string | number;
}

export interface ProductCardProps<T = any> {
  product: T;
  imageUrl: string;
  title: string;
  subtitle?: string;
  dailyRate: number;
  currency?: string;
  priceLabel?: string;
  specs: ProductSpec[];
  rating?: number;
  detailsLink?: string;
  onBookNow: (product: T) => void;
  onFavoriteToggle?: (product: T, isFavorited: boolean) => void;
  isFavorited?: boolean;
  showFavorite?: boolean;
  className?: string;
}

export function ProductCard<T = any>({
  product,
  imageUrl,
  title,
  subtitle,
  dailyRate,
  currency = '$',
  priceLabel = 'day',
  specs,
  rating,
  detailsLink,
  onBookNow,
  onFavoriteToggle,
  isFavorited = false,
  showFavorite = true,
  className = ''
}: ProductCardProps<T>) {
  const [favorited, setFavorited] = React.useState(isFavorited);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newFavorited = !favorited;
    setFavorited(newFavorited);

    if (onFavoriteToggle) {
      onFavoriteToggle(product, newFavorited);
    }
  };

  return (
    <Card className={`bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
          {subtitle && (
            <CardDescription className="text-sm text-muted-foreground">{subtitle}</CardDescription>
          )}
        </div>
        {showFavorite && (
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <Heart
              size={20}
              className={`transition-colors ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
        )}
      </CardHeader>

      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="aspect-video w-full rounded-md object-cover"
          loading="lazy"
        />
        <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
          {currency}{dailyRate}/{priceLabel}
        </Badge>
      </div>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <div key={index}>
              <p className="text-sm font-medium leading-none">{spec.label}</p>
              <p className="text-muted-foreground">{spec.value}</p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        {rating !== undefined && <ReviewStars rating={rating} />}
        <div className="space-x-2 ml-auto">
          {detailsLink && (
            <Link to={detailsLink}>
              <Button variant="outline">Details</Button>
            </Link>
          )}
          <Button onClick={() => onBookNow(product)}>Book Now</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
