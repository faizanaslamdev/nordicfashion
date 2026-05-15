'use client';

import { Product } from '@/lib/types';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  loading = false,
  emptyMessage = 'No products found',
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-80 rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-center text-muted-foreground text-lg">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
