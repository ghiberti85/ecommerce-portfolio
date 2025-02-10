'use client';

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaTrashAlt, FaSave, FaShoppingCart, FaTimesCircle } from 'react-icons/fa';

export default function CartPage() {
  const { cart, savedForLater, removeFromCart, saveForLater, moveToCart } = useCart();
  const [tab, setTab] = useState<'cart' | 'saved'>('cart');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setSelectedItem(id);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (selectedItem) {
      removeFromCart(selectedItem);
      setSelectedItem(null);
    }
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tabs para alternar entre "Carrinho" e "Salvos para Depois" */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab('cart')}
          className={`px-4 py-2 rounded-md font-semibold ${
            tab === 'cart' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          🛒 Carrinho ({cart.length})
        </button>
        <button
          onClick={() => setTab('saved')}
          className={`px-4 py-2 rounded-md font-semibold ${
            tab === 'saved' ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          ⭐ Salvos para Depois ({savedForLater.length})
        </button>
      </div>

      {tab === 'cart' ? (
        <>
          {/* Itens do carrinho */}
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Seu carrinho está vazio.</p>
          ) : (
            <div className="grid gap-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center border p-4 bg-gray-900 rounded-lg shadow-lg">
                  <Link href={`/product/${item.id}`}>
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} width={100} height={100} className="rounded-lg" />
                  </Link>
                  <div className="ml-4 flex-grow">
                    <h2 className="text-lg font-bold text-white">{item.name}</h2>
                    <p className="text-blue-400 font-medium">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => saveForLater(item)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-600 transition-colors"
                    >
                      <FaSave /> Salvar
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-600 transition-colors"
                    >
                      <FaTrashAlt /> Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Itens salvos */}
          {savedForLater.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhum item salvo.</p>
          ) : (
            <div className="grid gap-4">
              {savedForLater.map((item) => (
                <div key={item.id} className="flex items-center border p-4 bg-gray-800 rounded-lg shadow-lg">
                  <Link href={`/product/${item.id}`}>
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} width={100} height={100} className="rounded-lg" />
                  </Link>
                  <div className="ml-4 flex-grow">
                    <h2 className="text-lg font-bold text-white">{item.name}</h2>
                    <p className="text-blue-400 font-medium">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => moveToCart(item)}
                      className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition-colors"
                    >
                      <FaShoppingCart /> Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal de Confirmação de Remoção */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
            {/* Ícone de Alerta */}
            <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-4" />

            <h2 className="text-gray-600 ext-xl font-bold mb-2">Tem certeza?</h2>
            <p className="text-gray-600">Esta ação não poderá ser desfeita.</p>
            
            <div className="mt-4 flex justify-center gap-4">
              <button 
                onClick={confirmRemove} 
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-600 transition"
              >
                <FaTrashAlt /> Remover
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
