'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface FilterOptions {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'trending';
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
}: FilterSidebarProps) {
  return (
    <Card className="h-fit p-6 sticky top-24">
      <h3 className="mb-6 font-bold text-lg text-foreground">Filters</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="mb-3 font-semibold text-sm text-foreground">Category</h4>
        <div className="space-y-2">
          {['Fashion', 'Beauty', 'Accessories'].map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category === cat}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    category: e.target.checked ? cat : undefined,
                  })
                }
                className="w-4 h-4"
              />
              <span className="text-sm text-muted-foreground">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="mb-3 font-semibold text-sm text-foreground">Price Range</h4>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground">Min</label>
            <Input
              type="number"
              value={filters.priceMin || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  priceMin: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              placeholder="0"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Max</label>
            <Input
              type="number"
              value={filters.priceMax || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  priceMax: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              placeholder="10000"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="mb-3 font-semibold text-sm text-foreground">Rating</h4>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={filters.rating === rating}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    rating: e.target.checked ? rating : undefined,
                  })
                }
                name="rating"
                className="w-4 h-4"
              />
              <span className="text-sm text-muted-foreground">
                {rating}+ ★
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <h4 className="mb-3 font-semibold text-sm text-foreground">Sort By</h4>
        <select
          value={filters.sortBy || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              sortBy: (e.target.value as any) || undefined,
            })
          }
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="trending">Trending</option>
        </select>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        className="w-full"
        onClick={onReset}
      >
        Reset Filters
      </Button>
    </Card>
  );
}
