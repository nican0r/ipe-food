'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { foodItems } from '@/data/food-items';
import { FoodItem } from '@/types/food';
import { ImageUpload } from '@/components/ui/image-upload';
import Image from 'next/image';

export default function MenuManagementPage() {
  const [items, setItems] = useState<FoodItem[]>(foodItems);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddItem = () => {
    setIsAddingNew(true);
    setEditingItem({
      id: '',
      name: '',
      description: '',
      image: '',
      price: {
        medium: 0,
        large: 0
      },
      weight: {
        medium: '',
        large: ''
      },
      available: {
        medium: 0,
        large: 0
      }
    });
  };

  const handleEditItem = (item: FoodItem) => {
    setEditingItem(item);
    setIsAddingNew(false);
  };

  const handleDeleteItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleSaveItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;

    if (isAddingNew) {
      // Add new item
      const newItem = {
        ...editingItem,
        id: Math.random().toString(36).substr(2, 9) // Generate a random ID
      };
      setItems([...items, newItem]);
    } else {
      // Update existing item
      setItems(items.map(item => 
        item.id === editingItem.id ? editingItem : item
      ));
    }

    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAddingNew(false);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <Button onClick={handleAddItem} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Item
          </Button>
        </div>

        {editingItem && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{isAddingNew ? 'Add New Item' : 'Edit Item'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveItem} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editingItem.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingItem({ ...editingItem, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Image</Label>
                    <ImageUpload
                      value={editingItem.image}
                      onChange={(value) => setEditingItem({ ...editingItem, image: value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingItem.description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditingItem({ ...editingItem, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Medium Size</h3>
                    <div className="space-y-2">
                      <Label htmlFor="mediumPrice">Price</Label>
                      <Input
                        id="mediumPrice"
                        type="number"
                        value={editingItem.price.medium}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingItem({
                          ...editingItem,
                          price: { ...editingItem.price, medium: parseFloat(e.target.value) }
                        })}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mediumWeight">Weight</Label>
                      <Input
                        id="mediumWeight"
                        value={editingItem.weight.medium}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingItem({
                          ...editingItem,
                          weight: { ...editingItem.weight, medium: e.target.value }
                        })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mediumAvailable">Available Quantity</Label>
                      <Input
                        id="mediumAvailable"
                        type="number"
                        value={editingItem.available.medium}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingItem({
                          ...editingItem,
                          available: { ...editingItem.available, medium: parseInt(e.target.value) }
                        })}
                        required
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Large Size</h3>
                    <div className="space-y-2">
                      <Label htmlFor="largePrice">Price</Label>
                      <Input
                        id="largePrice"
                        type="number"
                        value={editingItem.price.large}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingItem({
                          ...editingItem,
                          price: { ...editingItem.price, large: parseFloat(e.target.value) }
                        })}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="largeWeight">Weight</Label>
                      <Input
                        id="largeWeight"
                        value={editingItem.weight.large}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingItem({
                          ...editingItem,
                          weight: { ...editingItem.weight, large: e.target.value }
                        })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="largeAvailable">Available Quantity</Label>
                      <Input
                        id="largeAvailable"
                        type="number"
                        value={editingItem.available.large}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingItem({
                          ...editingItem,
                          available: { ...editingItem.available, large: parseInt(e.target.value) }
                        })}
                        required
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isAddingNew ? 'Add Item' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{item.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditItem(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {item.image && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm">Medium</h4>
                      <p className="text-sm">${item.price.medium}</p>
                      <p className="text-sm text-muted-foreground">{item.weight.medium}</p>
                      <p className="text-sm text-muted-foreground">Available: {item.available.medium}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Large</h4>
                      <p className="text-sm">${item.price.large}</p>
                      <p className="text-sm text-muted-foreground">{item.weight.large}</p>
                      <p className="text-sm text-muted-foreground">Available: {item.available.large}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
} 