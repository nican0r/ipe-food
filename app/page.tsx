'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { foodItems } from '@/data/food-items';
import { FoodSize } from '@/types/food';
import { useCart } from '@/context/cart-context';
import Link from 'next/link';
import { toast } from "sonner";
import Image from 'next/image';

export default function Home() {
  const { addToCart, items, availableItems } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, FoodSize>>({});

  const handleSizeChange = (itemId: string, size: FoodSize) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const handleAddToCart = (item: typeof foodItems[0], size: FoodSize) => {
    const currentSize = selectedSizes[item.id] || 'medium';
    const available = availableItems.find(i => i.id === item.id)?.available[currentSize] || 0;
    
    if (available <= 0) {
      toast.error("Out of stock", {
        description: `${item.name} (${currentSize}) is currently unavailable.`,
      });
      return;
    }

    addToCart(item, size);
    toast.success(`${item.name} (${size}) added to cart`, {
      description: `Price: $${item.price[size].toFixed(2)}`,
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Food Menu</h1>
        <Link href="/checkout">
          <Button variant="outline" className="relative">
            View Cart
            {totalItems > 0 && (
              <Badge 
                variant="secondary" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
              >
                {totalItems}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableItems.map((item) => (
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
                onClick={() => handleAddToCart(item, selectedSizes[item.id] || 'medium')}
                disabled={item.available[selectedSizes[item.id] || 'medium'] <= 0}
              >
                {item.available[selectedSizes[item.id] || 'medium'] <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
