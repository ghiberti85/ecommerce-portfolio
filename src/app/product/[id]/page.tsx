'use client';

import { useProducts } from '../../../hooks/useProducts';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { ShoppingCart, Share } from 'lucide-react';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa'; // Ícone oficial do WhatsApp

// Simulação de avaliações
const fakeReviews = [
  { id: 1, user: 'Ana Silva', rating: 5, comment: 'Ótimo produto! Chegou rápido e é de excelente qualidade.' },
  { id: 2, user: 'Carlos Souza', rating: 4, comment: 'Bom, mas esperava um pouco mais pelo preço.' },
  { id: 3, user: 'Mariana Lima', rating: 5, comment: 'Amei! Atendeu todas as minhas expectativas.' },
];

// Função para gerar link de compartilhamento
const getShareLink = (productName: string, productId: string) => {
  const url = `${window.location.origin}/product/${productId}`;
  const message = `Confira este produto: ${productName}`;
  return {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(message + ' ' + url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  images?: string[];
}

export default function ProductPage() {
  const { products, isLoading, isError } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [shareLinks, setShareLinks] = useState<{ whatsapp: string; facebook: string } | null>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (products && params?.id) {
      const productId = String(params.id);
      const foundProduct = products.find(p => p.id === productId) || null;
      setProduct(foundProduct);
      setSelectedImage(foundProduct?.images?.[0] || foundProduct?.image || null);
      if (foundProduct) {
        setShareLinks(getShareLink(foundProduct.name, foundProduct.id));
      }
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
            <div className="flex gap-2 mt-6">
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
            className="bg-blue-500 text-white flex items-center gap-2 px-6 py-2 rounded-md transition-transform hover:scale-105 hover:bg-blue-600"
          >
            <ShoppingCart size={20} /> Adicionar ao Carrinho
          </button>

          {/* Botões de Compartilhamento */}
          {shareLinks && (
            <div className="mt-6">
              <h2 className="text-lg font-bold text-gray-300 mb-2 flex items-center gap-2">
                <Share size={20} /> Compartilhar:
              </h2>
              <div className="flex gap-3">
                <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-green-500 flex items-center gap-2 px-4 py-2 rounded-md text-white hover:bg-green-600 transition">
                  <FaWhatsapp size={18} /> WhatsApp
                </a>
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="bg-blue-600 flex items-center gap-2 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition">
                  <FaFacebook size={18} /> Facebook
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Seção de avaliações */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-300 mb-6">Avaliações</h2>
        {fakeReviews.length > 0 ? (
          <div className="space-y-4">
            {fakeReviews.map((review) => (
              <div key={review.id} className="bg-gray-800 p-4 rounded-lg shadow">
                <p className="font-semibold text-white">{review.user}</p>
                <p className="text-yellow-400">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
                <p className="text-gray-400">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhuma avaliação disponível.</p>
        )}
      </div>
    </div>
  );
}
