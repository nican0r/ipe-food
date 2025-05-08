'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FoodSize } from '@/types/food';
import { useOrders } from '@/context/orders-context';
import { toast } from "sonner";
import Image from 'next/image';
import { useMenu } from '@/context/menu-context';

export default function Home() {
  const { addOrder } = useOrders();
  const { foodItems, updateFoodItem } = useMenu();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, FoodSize>>({});
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<{item: typeof foodItems[0], size: FoodSize} | null>(null);

  const handleSizeChange = (itemId: string, size: FoodSize) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const handlePay = (item: typeof foodItems[0], size: FoodSize) => {
    const available = item.available[size] || 0;
    if (available <= 0) {
      toast.error("Out of stock", {
        description: `${item.name} (${size}) is currently unavailable.`,
      });
      return;
    }
    setPendingOrder({ item, size });
    setShowWalletModal(true);
  };

  const handleConfirmPay = () => {
    if (!pendingOrder) return;
    const { item, size } = pendingOrder;
    const mockAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual wallet address
    const orderItem = {
      ...item,
      size,
      quantity: 1
    };
    const total = item.price[size];
    addOrder(mockAddress, [orderItem], total);
    toast.success(`Order placed for ${item.name} (${size})!`, {
      description: `Price: $${item.price[size].toFixed(2)}`,
    });
    
    // Update the available quantity using the menu context
    const updatedItem = {
      ...item,
      available: {
        ...item.available,
        [size]: Math.max(0, item.available[size] - 1)
      }
    };
    updateFoodItem(item.id, updatedItem);
    
    setShowWalletModal(false);
    setPendingOrder(null);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Modal for wallet connection placeholder */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => { setShowWalletModal(false); setPendingOrder(null); }}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Connect Wallet</h2>
            <p className="mb-6 text-gray-700">
              Normally, you would connect your Ethereum wallet here to proceed with payment.
            </p>
            <Button className="w-full" onClick={handleConfirmPay}>
              Simulate Wallet Connection & Pay
            </Button>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Food Menu</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodItems.map((item) => (
          <Card key={item.id} className="flex flex-col overflow-hidden">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <CardHeader className="pt-4">
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Size:</span>
                  <Select
                    value={selectedSizes[item.id] || 'medium'}
                    onValueChange={(value) => handleSizeChange(item.id, value as FoodSize)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medium">
                        Medium ({item.weight.medium})
                      </SelectItem>
                      <SelectItem value="large">
                        Large ({item.weight.large})
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold">
                    ${item.price[selectedSizes[item.id] || 'medium'].toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.available[selectedSizes[item.id] || 'medium']} available
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handlePay(item, selectedSizes[item.id] || 'medium')}
                disabled={item.available[selectedSizes[item.id] || 'medium'] <= 0}
              >
                {item.available[selectedSizes[item.id] || 'medium'] <= 0 ? 'Out of Stock' : 'Pay'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
