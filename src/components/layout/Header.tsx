'use client';

import Link from 'next/link';
import { useCategories } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export const Header = () => {
  const categories = useCategories();
  const { cart } = useCart();

  // Calcular a quantidade total de itens no carrinho
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

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
        <div className="relative">
          <Link href="/cart" className="text-gray-600 hover:text-gray-800 relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
