export interface Store {
  id: string;
  name: string;
  color: string;
  logo: string;
}

export interface Price {
  storeId: string;
  amount: number;
  currency: string;
  inStock: boolean;
  lastUpdated: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  prices: Price[];
  description: string;
  unit: string;
  popularity: number; // 0-100
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: string[];
  purchaseHistoryIds: string[];
}

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  total: number;
  items: { productId: string; quantity: number }[];
}

export interface Alert {
  id: string;
  productId: string;
  targetPrice: number;
  active: boolean;
}