'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from '@/context/cart-context';
import { useOrders } from '@/context/orders-context';
import Link from 'next/link';
import { toast } from "sonner";

export default function Checkout() {
  const { items, clearCart, updateQuantity, removeFromCart } = useCart();
  const { addOrder } = useOrders();

  const handleQuantityChange = (itemId: string, size: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, size as any);
      toast.success("Item removed from cart");
    } else {
      updateQuantity(itemId, size as any, newQuantity);
    }
  };

  const handlePayment = () => {
    // This would be where you'd implement the actual wallet connection and payment
    const mockAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual wallet address
    const total = items.reduce(
      (sum, item) => sum + item.price[item.size] * item.quantity,
      0
    );

    const order = addOrder(mockAddress, items, total);
    
    toast.success("Order placed successfully!", {
      description: `Order ID: ${order.id}`,
    });
    clearCart();
  };

  const total = items.reduce(
    (sum, item) => sum + item.price[item.size] * item.quantity,
    0
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <Link href="/">
            <Button variant="outline">Back to Menu</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your order before payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.size} - ${item.price[item.size].toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <div className="w-24 text-right">
                    <p className="font-medium">
                      ${(item.price[item.size] * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handlePayment}
              disabled={items.length === 0}
            >
              Connect Wallet & Pay
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
} 