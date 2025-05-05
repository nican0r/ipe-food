'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrders } from '@/context/orders-context';
import { format } from 'date-fns';

export default function AdminPage() {
  const { orders, isLoading, error, retry } = useOrders();

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
            <p className="text-destructive">Error: {error}</p>
            <button onClick={retry} className="text-sm text-muted-foreground hover:text-foreground">
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            Total Orders: {orders.length}
          </div>
        </div>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No orders yet</p>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                      <CardDescription>
                        {format(order.timestamp, 'PPP p')}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${order.total.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.items.reduce((sum: number, item: any) => sum + item.quantity, 0)} items
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm">
                      <span className="font-medium">Wallet Address: </span>
                      <span className="font-mono">{order.address}</span>
                    </div>
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Order Items:</h3>
                      <div className="space-y-2">
                        {order.items.map((item: any) => (
                          <div key={`${order.id}-${item.id}-${item.size}`} className="flex justify-between items-center text-sm">
                            <div>
                              <span className="font-medium">{item.name}</span>
                              <span className="text-muted-foreground ml-2">
                                ({item.size}) x {item.quantity}
                              </span>
                            </div>
                            <div className="text-right">
                              <div>${(item.price * item.quantity).toFixed(2)}</div>
                              <div className="text-muted-foreground">
                                ${item.price.toFixed(2)} each
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
} 