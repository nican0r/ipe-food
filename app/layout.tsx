import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OrdersProvider } from "@/context/orders-context";
import { Toaster } from "@/components/ui/sonner";
import { MenuProvider } from "@/context/menu-context";

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
          <MenuProvider>
            {children}
            <Toaster />
          </MenuProvider>
        </OrdersProvider>
      </body>
    </html>
  );
}
