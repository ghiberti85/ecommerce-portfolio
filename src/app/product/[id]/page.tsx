'use client';

import { useProducts } from '../../../hooks/useProducts';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  images?: string[]; // Suporte a múltiplas imagens
}

export default function ProductPage() {
  const { products, isLoading, isError } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (products && params?.id) {
      const productId = String(params.id);
      const foundProduct = products.find(p => p.id === productId) || null;
      setProduct(foundProduct);
      setSelectedImage(foundProduct?.images?.[0] || foundProduct?.image || null);
    }
  }, [products, params?.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: selectedImage || '/placeholder.svg',
        quantity: 1,
      });

      toast.success(`${product.name} adicionado ao carrinho!`);
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
      {/* Botão de voltar */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all"
      >
        ← Voltar
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagem principal */}
        <div>
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <p className="text-center text-gray-500">Nenhuma imagem disponível</p>
          )}

          {/* Miniaturas do carrossel */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.images.map((img, index) => (
                <button key={index} onClick={() => setSelectedImage(img)}>
                  <Image
                    src={img}
                    alt={`Miniatura ${index + 1}`}
                    width={100}
                    height={100}
                    className={`w-20 h-20 object-cover rounded-lg border ${
                      selectedImage === img ? 'border-blue-500' : 'border-transparent'
                    } transition-all`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detalhes do produto */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-300">{product.name}</h1>
          <p className="text-gray-400 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4 text-blue-500">R$ {product.price.toFixed(2)}</p>

          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-6 py-2 rounded-md transition-transform hover:scale-105 hover:bg-blue-600"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
