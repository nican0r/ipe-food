import { CartItem } from './food';

export interface OrderItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  address: string;
  total: number;
  items: OrderItem[];
  timestamp: number;
} 