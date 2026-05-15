'use client';

import { Product, Store } from '@/lib/types';
import { formatPrice } from '@/lib/services';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PriceComparisonProps {
  product: Product;
  stores: Store[];
}

export function PriceComparison({
  product,
  stores,
}: PriceComparisonProps) {
  const sortedStores = stores
    .map((store) => ({
      store,
      price: product.prices[store.id],
      inStock: product.inStock[store.id],
    }))
    .filter((item) => item.price !== undefined)
    .sort((a, b) => (a.price || Infinity) - (b.price || Infinity));

  const minPrice = Math.min(...sortedStores.map((s) => s.price || Infinity));

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-foreground">Price Comparison</h3>
      {sortedStores.map(({ store, price, inStock }) => (
        <Card
          key={store.id}
          className={`p-4 transition-all ${
            price === minPrice ? 'border-accent bg-accent/5' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground">
                {store.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-foreground">{store.name}</p>
                {inStock ? (
                  <Badge variant="outline" className="h-5 text-xs">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="h-5 text-xs">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-primary">
                {price ? formatPrice(price) : 'N/A'}
              </p>
              {price === minPrice && (
                <p className="text-xs text-accent font-medium">Best Price</p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
