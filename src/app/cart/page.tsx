// src/app/cart/page.tsx
'use client';

import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center border p-4 rounded shadow">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                <div className="flex-grow">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 bg-gray-300 rounded">-</button>
                    <span className="text-lg">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="px-3 py-1 bg-gray-300 rounded">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                  Remover
                </button>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-6">Total: R$ {totalPrice.toFixed(2)}</h2>
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
