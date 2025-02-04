// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useCategories } from '../../hooks/useProducts';
import { ShoppingCart } from 'lucide-react';

export const Header = () => {
  const categories = useCategories();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Meu E-commerce
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {categories.map((category) => (
              <li key={category}>
                <Link href={`/category/${category.toLowerCase()}`} className="text-gray-600 hover:text-gray-800">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/cart" className="text-gray-600 hover:text-gray-800">
          <ShoppingCart size={24} />
        </Link>
      </div>
    </header>
  );
};