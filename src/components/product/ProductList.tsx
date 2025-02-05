// src/components/product/ProductList.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

export const ProductList: React.FC = () => {
  const { products, isLoading, isError } = useProducts();
  const { addToCart } = useCart();

  if (isLoading) return <div className="text-center text-lg">Carregando produtos...</div>;
  if (isError) return <div className="text-center text-red-500">Erro ao carregar produtos</div>;
  if (!products) return <div className="text-center text-gray-500">Nenhum produto encontrado</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
        >
          <Link href={`/product/${product.id}`} className="block">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover mb-3 rounded-lg"
            />
            <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold mt-2 text-blue-500">R$ {product.price.toFixed(2)}</p>
          </Link>
          <button
            onClick={() => {
              addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
              toast.success(`${product.name} adicionado ao carrinho!`);
            }}
            className="mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      ))}
    </div>
  );
};
