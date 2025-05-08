'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { FoodItem } from '@/types/food';
import { foodItems as initialFoodItems } from '@/data/food-items';

interface MenuContextType {
  foodItems: FoodItem[];
  addFoodItem: (item: FoodItem) => void;
  updateFoodItem: (id: string, updatedItem: FoodItem) => void;
  deleteFoodItem: (itemId: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const STORAGE_KEY = 'food-app-menu';

export function MenuProvider({ children }: { children: ReactNode }) {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(STORAGE_KEY);
      if (storedItems) {
        setFoodItems(JSON.parse(storedItems));
      }
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to load stored items:', error);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foodItems));
    }
  }, [foodItems, isInitialized]);

  const addFoodItem = (item: FoodItem) => {
    setFoodItems(prevItems => [...prevItems, item]);
  };

  const updateFoodItem = (id: string, updatedItem: FoodItem) => {
    setFoodItems(prevItems => 
      prevItems.map(item => item.id === id ? updatedItem : item)
    );
  };

  const deleteFoodItem = (itemId: string) => {
    setFoodItems(prevItems => 
      prevItems.filter(item => item.id !== itemId)
    );
  };

  return (
    <MenuContext.Provider value={{ foodItems, addFoodItem, updateFoodItem, deleteFoodItem }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
} 