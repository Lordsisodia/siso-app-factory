import React, { useEffect, useState } from 'react';
import { ProductCarousel } from '../../carousel/ProductCarousel';
import { Clock } from 'lucide-react';

export interface RecentlyViewedProps<T = any> {
  renderItem: (product: T) => React.ReactNode;
  storageKey?: string;
  title?: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  maxItems?: number;
  className?: string;
}

export function RecentlyViewed<T = any>({
  renderItem,
  storageKey = 'recentlyViewedProducts',
  title = 'Recently Viewed',
  icon,
  backgroundColor = 'bg-muted/50',
  maxItems = 6,
  className = ''
}: RecentlyViewedProps<T>) {
  const [recentProducts, setRecentProducts] = useState<T[]>([]);

  useEffect(() => {
    const loadRecent = () => {
      try {
        const recent = JSON.parse(localStorage.getItem(storageKey) || '[]');
        setRecentProducts(recent.slice(0, maxItems));
      } catch (error) {
        console.error('Error loading recently viewed:', error);
        setRecentProducts([]);
      }
    };

    loadRecent();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey) {
        loadRecent();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storageKey, maxItems]);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          {icon || <Clock className="h-6 w-6 text-primary" />}
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>

        <ProductCarousel
          products={recentProducts}
          renderItem={renderItem}
          itemsPerSlide={{ sm: 1, md: 2, lg: 3 }}
        />
      </div>
    </section>
  );
}

export default RecentlyViewed;
