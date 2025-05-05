'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/admin"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/admin" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Orders
            </Link>
            <Link
              href="/admin/menu"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/admin/menu" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Menu Management
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
} 