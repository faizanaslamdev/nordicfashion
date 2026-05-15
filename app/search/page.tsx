'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductGrid } from '@/components/product-grid';
import { FilterSidebar } from '@/components/filter-sidebar';
import {
  getAllProducts,
  searchProducts,
  getProductsByCategory,
  filterByPriceRange,
  filterByRating,
  sortProducts,
} from '@/lib/services';
import type { FilterOptions } from '@/components/filter-sidebar';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [filters, setFilters] = useState<FilterOptions>({});

  const filteredProducts = useMemo(() => {
    let results = query ? searchProducts(query).map((r) => r.product) : getAllProducts();

    // Apply category filter
    if (filters.category) {
      results = getProductsByCategory(filters.category);
    }

    // Apply price range filter
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      results = filterByPriceRange(
        results,
        filters.priceMin ?? 0,
        filters.priceMax ?? 100000
      );
    }

    // Apply rating filter
    if (filters.rating) {
      results = filterByRating(results, filters.rating);
    }

    // Apply sorting
    if (filters.sortBy) {
      results = sortProducts(results, filters.sortBy);
    }

    return results;
  }, [query, filters]);

  const handleReset = () => {
    setFilters({});
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            {query ? (
              <h1 className="text-4xl font-bold text-foreground">
                Search Results for{' '}
                <span className="text-primary">&quot;{query}&quot;</span>
              </h1>
            ) : (
              <h1 className="text-4xl font-bold text-foreground">
                All Products
              </h1>
            )}
            <p className="mt-2 text-lg text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleReset}
              />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <ProductGrid
                products={filteredProducts}
                emptyMessage={
                  query
                    ? `No products found for "${query}"`
                    : 'No products available'
                }
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
