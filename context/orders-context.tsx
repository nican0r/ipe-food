'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Order, OrderItem } from '@/types/order';
import { CartItem } from '@/types/food';
import { v4 as uuidv4 } from 'uuid';

interface OrdersContextType {
  orders: Order[];
  addOrder: (address: string, items: CartItem[], total: number) => Order;
  getOrder: (id: string) => Order | undefined;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const STORAGE_KEY = 'food-app-orders';

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadOrders = () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if we're on the client side
      if (typeof window === 'undefined') {
        throw new Error('Not running on client side');
      }

      // Check if localStorage is available
      if (!window.localStorage) {
        throw new Error('localStorage is not available');
      }

      const storedOrders = localStorage.getItem(STORAGE_KEY);
      
      if (storedOrders) {
        try {
          const parsedOrders = JSON.parse(storedOrders);
          setOrders(Array.isArray(parsedOrders) ? parsedOrders : []);
        } catch (error) {
          console.error('Failed to parse stored orders:', error);
          setOrders([]);
        }
      }

      setIsLoading(false);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to load orders');
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadOrders();
  }, []);

  // Retry mechanism
  useEffect(() => {
    if (retryCount > 0) {
      const timer = setTimeout(() => {
        loadOrders();
      }, 1000); // Wait 1 second before retrying
      return () => clearTimeout(timer);
    }
  }, [retryCount]);

  const retry = () => {
    setRetryCount(prev => prev + 1);
  };

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      } catch (error) {
        console.error('Failed to save orders:', error);
      }
    }
  }, [orders, isLoading]);

  const addOrder = (address: string, items: CartItem[], total: number): Order => {
    try {
      const orderItems: OrderItem[] = items.map(item => ({
        id: item.id,
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price[item.size]
      }));

      const newOrder: Order = {
        id: uuidv4(),
        address,
        total,
        items: orderItems,
        timestamp: Date.now()
      };

      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  };

  const getOrder = (id: string) => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        getOrder,
        isLoading,
        error,
        retry,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
} 