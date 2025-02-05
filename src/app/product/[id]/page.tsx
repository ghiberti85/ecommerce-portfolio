// src/app/product/[id]/page.tsx
'use client';

import { useProducts } from '../../../hooks/useProducts';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export default function ProductPage() {
  const { products, isLoading, isError } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (products && params?.id) {
      const productId = String(params.id);
      const foundProduct = products.find(p => p.id === productId) || null;
      setProduct(foundProduct);
    }
  }, [products, params?.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl font-semibold">Carregando produto...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl font-semibold text-red-500">Erro ao carregar produto.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">R$ {product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className={`bg-blue-500 text-white px-6 py-2 rounded-md transition-colors ${
              added ? "bg-green-500" : "hover:bg-blue-600"
            }`}
          >
            {added ? "Adicionado!" : "Adicionar ao Carrinho"}
          </button>
        </div>
      </div>
    </div>
  );
}
