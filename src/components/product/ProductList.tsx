// src/components/product/ProductList.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useProducts } from '../../hooks/useProducts';

export const ProductList: React.FC = () => {
  const { products, isLoading, isError } = useProducts();

  if (isLoading) return <div className="text-center text-lg text-white">Carregando produtos...</div>;
  if (isError) return <div className="text-center text-red-500">Erro ao carregar produtos</div>;
  if (!products) return <div className="text-center text-gray-300">Nenhum produto encontrado</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-slate-400 p-4 rounded-lg shadow-lg bg-slate-800 hover:shadow-xl transition-transform duration-300 transform hover:scale-105 flex flex-col h-full"
        >
          <Link href={`/product/${product.id}`} className="block">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover mb-3 rounded-lg"
            />
            <h2 className="text-lg font-bold text-white">{product.name}</h2>
            <p className="text-gray-400 text-sm">{product.description}</p>
          </Link>
          <div className="mt-auto">
            <p className="text-lg font-semibold mt-2 text-blue-400">R$ {product.price.toFixed(2)}</p>
            <Link href={`/product/${product.id}`}>
              <button className="mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Saiba Mais
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
