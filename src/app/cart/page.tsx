'use client';

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaTrashAlt, FaSave, FaShoppingCart, FaTimesCircle, FaPlus, FaMinus, FaArrowRight } from 'react-icons/fa';

export default function CartPage() {
  const { cart, savedForLater, removeFromCart, saveForLater, moveToCart, addToCart, decreaseQuantity } = useCart();
  const [tab, setTab] = useState<'cart' | 'saved'>('cart');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Cálculo do resumo do carrinho
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

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
      {/* Resumo da Compra */}
      {cart.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-gray-800 p-4 rounded-lg shadow-md text-center sm:text-left">
          <h1 className="text-2xl font-bold text-white">Carrinho de Compras</h1>
          <p className="text-gray-300">🛒 {totalItems} itens | 💰 R$ {totalPrice.toFixed(2)}</p>
        </div>
      )}

      {/* Tabs para alternar entre "Carrinho" e "Salvos para Depois" */}
      <div className="flex space-x-4 mb-6 items-center justify-center">
        <button
          onClick={() => setTab('cart')}
          className={`px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 ${
            tab === 'cart' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          <FaShoppingCart className="text-lg" /> Carrinho ({cart.length})
        </button>
        <button
          onClick={() => setTab('saved')}
          className={`px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 ${
            tab === 'saved' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          <FaSave className="text-lg" /> Salvos ({savedForLater.length})
        </button>
      </div>

      {tab === 'cart' ? (
        <>
          {/* Itens do carrinho */}
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Seu carrinho está vazio.</p>
          ) : (
            <div className="grid gap-6">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center border p-4 bg-gray-900 rounded-lg shadow-lg gap-4">
                  <Link href={`/product/${item.id}`} className="w-full sm:w-auto">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg mx-auto sm:mx-0"
                    />
                  </Link>
                  <div className="flex-grow text-center sm:text-left">
                    <h2 className="text-lg font-bold text-white">{item.name}</h2>
                    <p className="text-blue-400 font-medium">R$ {item.price.toFixed(2)}</p>
                    {/* Controles de Quantidade */}
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-2 bg-gray-700 hover:bg-gray-800 transition-colors rounded"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-2 py-2 bg-gray-700 hover:bg-gray-800 transition-colors rounded"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => saveForLater(item)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors w-full sm:w-auto"
                    >
                      <FaSave className="text-lg" /> Salvar
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-red-600 transition-colors w-full sm:w-auto"
                    >
                      <FaTrashAlt className="text-lg" /> Remover
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
            <div className="grid gap-6">
              {savedForLater.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center border p-4 bg-gray-800 rounded-lg shadow-lg gap-4">
                  <Link href={`/product/${item.id}`} className="w-full sm:w-auto">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg mx-auto sm:mx-0"
                    />
                  </Link>
                  <div className="flex-grow text-center sm:text-left">
                    <h2 className="text-lg font-bold text-white">{item.name}</h2>
                    <p className="text-blue-400 font-medium">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => moveToCart(item)}
                    className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-green-600 transition-colors w-full sm:w-auto"
                  >
                    <FaShoppingCart className="text-lg" /> Adicionar ao Carrinho
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Botão para ir ao Checkout */}
            {cart.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Link href="/checkout">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition">
              <FaArrowRight /> Ir para o Checkout
            </button>
          </Link>
        </div>
      )}

      {/* Modal de Confirmação de Remoção */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative w-full max-w-sm">
            <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Tem certeza?</h2>
            <p className="text-gray-600">Essa ação não pode ser desfeita.</p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={confirmRemove} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                Remover
              </button>
              <button onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
