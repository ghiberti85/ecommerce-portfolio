'use client';

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center border border-gray-800 p-4 rounded-lg shadow-lg bg-gray-900">
                {/* 🔗 Agora a imagem do produto é clicável e redireciona para a página do produto */}
                <Link href={`/product/${item.id}`} className="block">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={136} // 96px -> Tailwind equivalente a w-24
                    height={136} // 96px -> Tailwind equivalente a h-24
                    className="rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <div className="flex-grow ml-4">
                  <h2 className="text-lg font-bold text-white">{item.name}</h2>
                  <p className="text-blue-400 font-medium">R$ {item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-800 transition-colors rounded"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-800 transition-colors rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-6 text-white">Total: R$ {totalPrice.toFixed(2)}</h2>
          <button
            onClick={clearCart}
            className="mt-4 bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Limpar Carrinho
          </button>
        </>
      )}
    </div>
  );
}
