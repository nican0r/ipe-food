import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { OrdersProvider } from "@/context/orders-context";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Food Ordering App",
  description: "Order your favorite food items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OrdersProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </OrdersProvider>
      </body>
    </html>
  );
}
