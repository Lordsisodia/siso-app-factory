import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Filter, Sliders } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  priceSort: 'none' | 'asc' | 'desc';
  onPriceSortChange: (sort: 'none' | 'asc' | 'desc') => void;
  onAdvancedFiltersClick?: () => void;
  onMobileFiltersClick?: () => void;
  sticky?: boolean;
  className?: string;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  categories,
  priceSort,
  onPriceSortChange,
  onAdvancedFiltersClick,
  onMobileFiltersClick,
  sticky = true,
  className
}) => {
  return (
    <section
      className={cn(
        "py-6 bg-background border-b border-border/30 backdrop-blur-md bg-background/95",
        sticky && "sticky top-0 z-20",
        className
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                    selectedCategory === category
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary hover:bg-secondary/70"
                  )}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}

              {categories.length > 5 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      More <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuRadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
                      {categories.slice(5).map((category) => (
                        <DropdownMenuRadioItem
                          key={category}
                          value={category}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  Price: {priceSort === 'asc' ? 'Low to High' : priceSort === 'desc' ? 'High to Low' : 'Sort by'}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={priceSort} onValueChange={(value) => onPriceSortChange(value as 'none' | 'asc' | 'desc')}>
                  <DropdownMenuRadioItem value="none">Default</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="asc">Price: Low to High</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="desc">Price: High to Low</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Filter Button */}
            {onMobileFiltersClick && (
              <Button
                variant="outline"
                size="sm"
                className="h-9 md:hidden"
                onClick={onMobileFiltersClick}
              >
                <Filter className="mr-1 h-4 w-4" />
                Filters
              </Button>
            )}

            {/* Desktop Advanced Filter Button */}
            {onAdvancedFiltersClick && (
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2 h-9"
                onClick={onAdvancedFiltersClick}
              >
                <Sliders className="h-4 w-4" />
                Advanced Filters
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFilters;
