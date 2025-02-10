// src/app/category/[category]/page.tsx
'use client';

import { useProducts } from '../../../hooks/useProducts';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CategoryFilter } from '../../../components/CategoryFilter';
import { normalizeString } from '../../../utils/normalizeString';

export default function CategoryPage() {
  const { products = [], isLoading, isError } = useProducts();
  const params = useParams();
  const category = params.category ? String(params.category) : '';

  const filteredProducts = products.filter((product) =>
    product.category && normalizeString(product.category) === category
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px] w-full text-center text-gray-500 text-lg font-medium">
        Carregando produtos...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[300px] w-full text-center text-red-500 text-lg font-medium">
        Erro ao carregar produtos.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold my-6 capitalize">Categoria: {category}</h1>
      <CategoryFilter />
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <Link
              href={`/product/${product.id}`}
              key={`${product.id}-${index}`}
              className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-48 object-cover mb-3 rounded-lg"
              />
              <h2 className="text-xl font-bold text-gray-300">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-semibold mt-2 text-blue-500">R$ {product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[300px] w-full text-center text-gray-500 text-lg font-medium">
          Nenhum produto encontrado nesta categoria.
        </div>
      )}
    </div>
  );
}
