import { products, stores } from './dummy-data';
import { Product, SearchResult, Store } from './types';

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getTrendingProducts = (limit: number = 6): Product[] => {
  return products
    .filter((p) => p.trending)
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, limit);
};

export const searchProducts = (query: string): SearchResult[] => {
  const lowerQuery = query.toLowerCase();

  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    )
    .map((product) => ({
      product,
      relevance: calculateRelevance(product, lowerQuery),
    }))
    .sort((a, b) => b.relevance - a.relevance);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getLowestPriceStore = (
  product: Product
): { store: Store; price: number } | null => {
  let lowestStore: Store | null = null;
  let lowestPrice = Infinity;

  Object.entries(product.prices).forEach(([storeId, price]) => {
    if (product.inStock[storeId] && price < lowestPrice) {
      lowestPrice = price;
      lowestStore = stores.find((s) => s.id === storeId) || null;
    }
  });

  return lowestStore ? { store: lowestStore, price: lowestPrice } : null;
};

export const getStoreById = (id: string): Store | undefined => {
  return stores.find((s) => s.id === id);
};

export const getAllStores = (): Store[] => {
  return stores;
};

export const getProductComparison = (productId: string) => {
  const product = getProductById(productId);
  if (!product) return null;

  const comparison = stores.map((store) => ({
    store,
    price: product.prices[store.id] || null,
    inStock: product.inStock[store.id] || false,
  }));

  return { product, comparison };
};

export const getPriceChartData = (productId: string) => {
  const product = getProductById(productId);
  if (!product) return null;

  return product.priceHistory.map((point) => ({
    date: formatDateShort(point.date),
    price: point.price,
    store: point.store,
  }));
};

export const getSimilarProducts = (productId: string, limit: number = 4) => {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};

// Helper functions
const calculateRelevance = (product: Product, query: string): number => {
  let score = 0;

  if (product.name.toLowerCase().startsWith(query)) score += 3;
  else if (product.name.toLowerCase().includes(query)) score += 2;

  if (product.brand.toLowerCase() === query) score += 2;
  else if (product.brand.toLowerCase().includes(query)) score += 1;

  if (product.category.toLowerCase() === query) score += 1;

  return score;
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
  });
};

export const filterByPriceRange = (
  products: Product[],
  minPrice: number,
  maxPrice: number
): Product[] => {
  return products.filter(
    (p) => p.lowestPrice >= minPrice && p.lowestPrice <= maxPrice
  );
};

export const filterByRating = (
  products: Product[],
  minRating: number
): Product[] => {
  return products.filter((p) => p.rating >= minRating);
};

export const sortProducts = (
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'trending'
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.lowestPrice - b.lowestPrice);
    case 'price-desc':
      return sorted.sort((a, b) => b.lowestPrice - a.lowestPrice);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'trending':
      return sorted.sort((a, b) => b.trendingScore - a.trendingScore);
    default:
      return sorted;
  }
};
