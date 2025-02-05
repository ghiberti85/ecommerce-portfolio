// src/app/category/[category]/page.tsx
'use client';

import { useProducts } from '../../../hooks/useProducts';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage() {
  const { products = [], isLoading, isError } = useProducts(); // Garantimos que products não seja undefined
  const params = useParams();
  const category = params.category ? String(params.category) : '';

  const filteredProducts = products.filter((product) =>
    category ? product.category.toLowerCase() === category.toLowerCase() : true
  );

  if (isLoading) return <div className="text-center text-lg">Carregando produtos...</div>;
  if (isError) return <div className="text-center text-red-500">Erro ao carregar produtos</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">Categoria: {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover mb-3 rounded-lg"
              />
              <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-semibold mt-2 text-blue-500">R$ {product.price.toFixed(2)}</p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>
    </div>
  );
}