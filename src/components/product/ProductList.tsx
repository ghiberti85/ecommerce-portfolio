// src/components/product/ProductList.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useProducts } from '../../hooks/useProducts';

export const ProductList: React.FC = () => {
  const { products, isLoading, isError } = useProducts();

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar produtos</div>;
  if (!products) return <div>Nenhum produto encontrado</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id} className="border p-4 rounded shadow hover:shadow-md transition-shadow">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover mb-2" />
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold mt-2">R$ {product.price.toFixed(2)}</p>
        </Link>
      ))}
    </div>
  );
};