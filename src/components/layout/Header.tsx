'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Header = () => {
  const { cart } = useCart();



  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md pt-6 pb-4">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Meu E-commerce
        </Link>

        <div className="relative mt-2 sm:mt-0">
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
