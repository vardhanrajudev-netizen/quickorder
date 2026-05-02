import { Order, Restaurant } from './types';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Alexander Vance',
    restaurantName: 'The Golden Truffle',
    items: ['Wagyu Ribeye', 'Black Truffle Risotto'],
    total: 340.50,
    status: 'preparing',
    timestamp: new Date().toISOString(),
    location: { lat: 40.7128, lng: -74.0060 },
    priority: 'vip'
  },
  {
    id: 'ORD-002',
    customerName: 'Elena Rossi',
    restaurantName: 'Lumière Dining',
    items: ['Lobster Thermidor', 'Vintage Champagne'],
    total: 580.00,
    status: 'dispatched',
    timestamp: new Date().toISOString(),
    location: { lat: 40.7306, lng: -73.9352 },
    priority: 'premium'
  },
  {
    id: 'ORD-003',
    customerName: 'James Sterling',
    restaurantName: 'Sora Omakase',
    items: ['Premium Omakase Box', 'Saké Flight'],
    total: 210.00,
    status: 'pending',
    timestamp: new Date().toISOString(),
    location: { lat: 40.7589, lng: -73.9851 },
    priority: 'premium'
  }
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'pizza-hub',
    name: 'Pizza Hub',
    cuisine: 'Artisan Wood-Fired',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    deliveryTime: '20-30 min',
    category: 'Signature'
  },
  {
    id: 'burger-house',
    name: 'Burger House',
    cuisine: 'Gourmet Wagyu Burgers',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    deliveryTime: '15-25 min',
    category: 'Signature'
  },
  {
    id: 'asian-bowl',
    name: 'Asian Bowl',
    cuisine: 'Pan-Asian Fusion',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800',
    deliveryTime: '20-35 min',
    category: 'Boutique'
  },
  {
    id: 'healthy-eats',
    name: 'Healthy Eats',
    cuisine: 'Organic & Wellness',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    deliveryTime: '15-20 min',
    category: 'Boutique'
  }
];
