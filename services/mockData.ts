import { Product, Store, User, Order } from '../types';

export const STORES: Store[] = [
  { id: 's1', name: 'FreshMart', color: '#10b981', logo: 'FM' },
  { id: 's2', name: 'ValueGrocer', color: '#3b82f6', logo: 'VG' },
  { id: 's3', name: 'OrganicChoice', color: '#f59e0b', logo: 'OC' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Organic Whole Milk',
    category: 'Dairy',
    image: 'https://picsum.photos/id/225/400/400',
    description: 'Fresh organic whole milk from local pasture-raised cows.',
    unit: '1 Gallon',
    popularity: 95,
    prices: [
      { storeId: 's1', amount: 5.99, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
      { storeId: 's2', amount: 5.49, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
      { storeId: 's3', amount: 6.99, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
    ],
  },
  {
    id: 'p2',
    name: 'Avocados (Bag)',
    category: 'Produce',
    image: 'https://picsum.photos/id/292/400/400',
    description: 'Ripe and ready to eat avocados. Bag of 5.',
    unit: '5 ct',
    popularity: 88,
    prices: [
      { storeId: 's1', amount: 4.99, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
      { storeId: 's2', amount: 5.99, currency: 'USD', inStock: false, lastUpdated: '2023-10-26' },
      { storeId: 's3', amount: 5.49, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
    ],
  },
  {
    id: 'p3',
    name: 'Sourdough Bread',
    category: 'Bakery',
    image: 'https://picsum.photos/id/431/400/400',
    description: 'Artisan sourdough bread baked fresh daily.',
    unit: '1 Loaf',
    popularity: 75,
    prices: [
      { storeId: 's1', amount: 3.99, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
      { storeId: 's2', amount: 3.49, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
      { storeId: 's3', amount: 4.50, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
    ],
  },
  {
    id: 'p4',
    name: 'Premium Coffee Beans',
    category: 'Pantry',
    image: 'https://picsum.photos/id/425/400/400',
    description: 'Medium roast arabica beans.',
    unit: '12 oz',
    popularity: 92,
    prices: [
      { storeId: 's1', amount: 12.99, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
      { storeId: 's2', amount: 11.50, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
      { storeId: 's3', amount: 14.99, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
    ],
  },
  {
    id: 'p5',
    name: 'Free Range Eggs',
    category: 'Dairy',
    image: 'https://picsum.photos/id/296/400/400',
    description: 'Large brown eggs, free range.',
    unit: '1 Dozen',
    popularity: 98,
    prices: [
      { storeId: 's1', amount: 6.49, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
      { storeId: 's2', amount: 5.99, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
      { storeId: 's3', amount: 7.29, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
    ],
  },
  {
    id: 'p6',
    name: 'Pasta Sauce',
    category: 'Pantry',
    image: 'https://picsum.photos/id/493/400/400',
    description: 'Traditional basil and tomato sauce.',
    unit: '24 oz',
    popularity: 60,
    prices: [
      { storeId: 's1', amount: 2.99, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
      { storeId: 's2', amount: 2.49, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
      { storeId: 's3', amount: 3.99, currency: 'USD', inStock: true, lastUpdated: '2023-10-26' },
    ],
  },
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  preferences: ['Organic', 'Gluten-Free', 'Low Sugar'],
  purchaseHistoryIds: ['p1', 'p3', 'p5'],
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_123',
    date: '2023-10-20',
    status: 'Delivered',
    total: 45.20,
    items: [{ productId: 'p1', quantity: 2 }, { productId: 'p3', quantity: 1 }],
  },
  {
    id: 'ord_124',
    date: '2023-10-10',
    status: 'Delivered',
    total: 32.50,
    items: [{ productId: 'p5', quantity: 2 }, { productId: 'p2', quantity: 2 }],
  },
];