export type FoodSize = 'medium' | 'large';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: {
    medium: number;
    large: number;
  };
  weight: {
    medium: string;
    large: string;
  };
  image: string;
  available: {
    medium: number;
    large: number;
  };
}

export interface CartItem extends FoodItem {
  size: FoodSize;
  quantity: number;
} 