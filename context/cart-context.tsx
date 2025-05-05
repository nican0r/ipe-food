'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, FoodItem, FoodSize } from '@/types/food';
import { foodItems } from '@/data/food-items';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: FoodItem, size: FoodSize) => void;
  removeFromCart: (itemId: string, size: FoodSize) => void;
  updateQuantity: (itemId: string, size: FoodSize, quantity: number) => void;
  clearCart: () => void;
  availableItems: typeof foodItems;
  updateAvailable: (itemId: string, size: FoodSize, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [availableItems, setAvailableItems] = useState(foodItems);

  const updateAvailable = (itemId: string, size: FoodSize, quantity: number) => {
    setAvailableItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          available: {
            ...item.available,
            [size]: Math.max(0, item.available[size] - quantity)
          }
        };
      }
      return item;
    }));
  };

  const addToCart = (item: FoodItem, size: FoodSize) => {
    const existingItem = items.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === size
    );

    if (existingItem) {
      setItems(
        items.map((cartItem) =>
          cartItem.id === item.id && cartItem.size === size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setItems([...items, { ...item, size, quantity: 1 }]);
    }

    // Update available quantity
    updateAvailable(item.id, size, 1);
  };

  const removeFromCart = (itemId: string, size: FoodSize) => {
    const itemToRemove = items.find(
      (item) => item.id === itemId && item.size === size
    );
    
    if (itemToRemove) {
      // Update available quantity before removing
      updateAvailable(itemId, size, -itemToRemove.quantity);
    }

    setItems(items.filter((item) => !(item.id === itemId && item.size === size)));
  };

  const updateQuantity = (itemId: string, size: FoodSize, quantity: number) => {
    const currentItem = items.find(
      (item) => item.id === itemId && item.size === size
    );

    if (currentItem) {
      const quantityDifference = quantity - currentItem.quantity;
      updateAvailable(itemId, size, quantityDifference);
    }

    setItems(
      items.map((item) =>
        item.id === itemId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    // Restore all available quantities
    items.forEach(item => {
      updateAvailable(item.id, item.size, -item.quantity);
    });
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        availableItems,
        updateAvailable,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 