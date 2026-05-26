import { HOME_FEATURED_PRODUCT_IDS } from '@/lib/constants/featured';
import { products, stores } from '@/lib/data/dummy-data';
import type { Product } from '@/lib/types';

const BRAND_FALLBACK_LIMIT = 12;

export interface BrandListingResult {
  products: Product[];
  usedFallback: boolean;
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getTrendingProducts(limit = 6): Product[] {
  return products
    .filter((p) => p.trending)
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, limit);
}

export function getHomeFeaturedProducts(limit = 8): Product[] {
  return HOME_FEATURED_PRODUCT_IDS.map((id) => getProductById(String(id)))
    .filter((p): p is Product => p != null)
    .slice(0, limit);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

function getDirectStoreProducts(storeId: string): Product[] {
  return products.filter(
    (p) => p.prices[storeId] != null && p.inStock[storeId] !== false,
  );
}

/** Curated slice of the catalog when a brand has no dedicated listings (demo). */
function getBrandFallbackProducts(storeId: string, limit = BRAND_FALLBACK_LIMIT): Product[] {
  const storeIndex = Math.max(
    0,
    stores.findIndex((store) => store.id === storeId),
  );
  const count = products.length;
  if (count === 0) return [];

  const start = (storeIndex * 3) % count;
  const picked: Product[] = [];

  for (let i = 0; i < limit; i++) {
    picked.push(products[(start + i) % count]);
  }

  return picked;
}

export function resolveBrandProducts(storeId: string): BrandListingResult {
  const direct = getDirectStoreProducts(storeId);
  if (direct.length > 0) {
    return { products: direct, usedFallback: false };
  }

  return {
    products: getBrandFallbackProducts(storeId),
    usedFallback: true,
  };
}

export function getProductsByStoreId(storeId: string): Product[] {
  return resolveBrandProducts(storeId).products;
}

export function getSimilarProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}
