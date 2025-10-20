
import React from 'react';
import { Button } from '@siso/ui';
import { ChevronDown, Filter, Sliders } from 'lucide-react';
import { cn } from '@siso/ui/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@siso/ui';

interface CarFiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
  priceSort: 'none' | 'asc' | 'desc';
  setPriceSort: (sort: 'none' | 'asc' | 'desc') => void;
  categories: string[];
  setIsFilterDrawerOpen: (isOpen: boolean) => void;
}

const CarFilters: React.FC<CarFiltersProps> = ({
  filter,
  setFilter,
  priceSort,
  setPriceSort,
  categories,
  setIsFilterDrawerOpen
}) => {
  return (
    <section className="py-6 bg-background border-b border-border/30 sticky top-0 z-20 backdrop-blur-md bg-background/95">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all-medium",
                    filter === category
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
                    <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
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
                <DropdownMenuRadioGroup value={priceSort} onValueChange={(value) => setPriceSort(value as 'none' | 'asc' | 'desc')}>
                  <DropdownMenuRadioItem value="none">Default</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="asc">Price: Low to High</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="desc">Price: High to Low</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 md:hidden"
              onClick={() => setIsFilterDrawerOpen(true)}
            >
              <Filter className="mr-1 h-4 w-4" />
              Filters
            </Button>

            {/* Desktop Advanced Filter Button */}
            <Button variant="outline" className="hidden md:flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarFilters;
