'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Header = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-900 text-white py-8 lg:py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo/Título */}
        <Link href="/" className="text-xl font-bold">
          E-commerce Portfolio
        </Link>

        {/* Ícone do Carrinho */}
        <Link href="/cart" className="relative">
          <ShoppingCart size={28} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};
