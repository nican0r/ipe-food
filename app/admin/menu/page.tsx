'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { FoodItem } from '@/types/food';
import { ImageUpload } from '@/components/ui/image-upload';
import Image from 'next/image';
import { useMenu } from '@/context/menu-context';

export default function MenuManagementPage() {
  const { foodItems, addFoodItem, updateFoodItem, deleteFoodItem } = useMenu();
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
    deleteFoodItem(itemId);
  };

  const handleSaveItem = (e: FormEvent) => {
    e.preventDefault();
    
    if (!editingItem) return;
    
    if (editingItem) {
      updateFoodItem(editingItem.id, editingItem);
    } else {
      addFoodItem(editingItem);
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
                        name="price-medium"
                        type="number"
                        value={editingItem.price.medium}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingItem({
                          ...editingItem,
                          price: { ...editingItem.price, medium: parseFloat(e.target.value) || 0 }
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
                        name="weight-medium"
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
                        name="available-medium"
                        type="number"
                        value={editingItem.available.medium}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingItem({
                          ...editingItem,
                          available: { ...editingItem.available, medium: parseInt(e.target.value) || 0 }
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
                        name="price-large"
                        type="number"
                        value={editingItem.price.large}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingItem({
                          ...editingItem,
                          price: { ...editingItem.price, large: parseFloat(e.target.value) || 0 }
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
                        name="weight-large"
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
                        name="available-large"
                        type="number"
                        value={editingItem.available.large}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingItem({
                          ...editingItem,
                          available: { ...editingItem.available, large: parseInt(e.target.value) || 0 }
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
                    <span className="font-medium">Medium Size:</span>
                    <div className="text-right">
                      <div className="text-lg font-bold">${item.price.medium.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.weight.medium} - {item.available.medium} available
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Large Size:</span>
                    <div className="text-right">
                      <div className="text-lg font-bold">${item.price.large.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.weight.large} - {item.available.large} available
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditItem(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
} 