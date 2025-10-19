import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { CarouselControls } from '../CarouselControls';

export interface ProductCarouselProps<T = any> {
  products: T[];
  renderItem: (product: T) => React.ReactNode;
  itemsPerSlide?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  loop?: boolean;
  showControls?: boolean;
  className?: string;
}

export function ProductCarousel<T = any>({
  products,
  renderItem,
  itemsPerSlide = { sm: 1, md: 2, lg: 3 },
  loop = true,
  showControls = true,
  className = ''
}: ProductCarouselProps<T>) {
  const getBasisClass = () => {
    const mdBasis = itemsPerSlide.md ? `md:basis-1/${itemsPerSlide.md}` : 'md:basis-1/2';
    const lgBasis = itemsPerSlide.lg ? `lg:basis-1/${itemsPerSlide.lg}` : 'lg:basis-1/3';
    return `${mdBasis} ${lgBasis}`;
  };

  return (
    <div className={className}>
      <Carousel
        opts={{
          align: "start",
          loop: loop,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product, index) => (
            <CarouselItem key={index} className={`pl-4 ${getBasisClass()}`}>
              {renderItem(product)}
            </CarouselItem>
          ))}
        </CarouselContent>
        {showControls && <CarouselControls />}
      </Carousel>
    </div>
  );
}

export default ProductCarousel;
