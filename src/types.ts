export type OrderStatus = 'pending' | 'preparing' | 'dispatched' | 'delivered';

export interface Order {
  id: string;
  customerName: string;
  restaurantName: string;
  items: string[];
  total: number;
  status: OrderStatus;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
  priority: 'standard' | 'premium' | 'vip';
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
  deliveryTime: string;
  category: 'Michelin Star' | 'Signature' | 'Boutique';
}
