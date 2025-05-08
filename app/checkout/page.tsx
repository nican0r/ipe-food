'use client';

import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Checkout() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <Link href="/">
            <Button variant="outline">Back to Menu</Button>
          </Link>
        </div>
        <div className="text-center text-lg text-muted-foreground py-16">
          Checkout is now handled per dish. Please select your dish and pay directly from the menu.
        </div>
      </div>
    </main>
  );
} 