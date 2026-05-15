export interface Store {
  id: string;
  name: string;
  country: string;
  logo?: string;
  currency: string;
}

export interface PricePoint {
  date: string;
  price: number;
  store: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Fashion' | 'Beauty' | 'Accessories';
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  prices: {
    [storeId: string]: number;
  };
  priceHistory: PricePoint[];
  inStock: {
    [storeId: string]: boolean;
  };
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  savingsPercent: number;
  trending: boolean;
  trendingScore: number;
}

export interface SearchResult {
  product: Product;
  relevance: number;
}

export interface ComparisonData {
  product: Product;
  stores: Store[];
}
