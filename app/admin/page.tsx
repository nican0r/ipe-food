'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOrders } from '@/context/orders-context';
import { Check, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPage() {
  const { orders, toggleOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState('pending');

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const completedOrders = orders.filter(order => order.status === 'completed');

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Orders</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No pending orders</p>
            ) : (
              pendingOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleOrderStatus(order.id)}
                      className="gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Mark as Completed
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(order.timestamp)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Address: {order.address}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.quantity}x {item.name} ({item.size})
                            </span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-medium pt-2 border-t">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No completed orders</p>
            ) : (
              completedOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleOrderStatus(order.id)}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Mark as Pending
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(order.timestamp)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Address: {order.address}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.quantity}x {item.name} ({item.size})
                            </span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-medium pt-2 border-t">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
} 