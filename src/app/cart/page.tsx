'use client';

import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

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
                  <p className="text-gray-700">Quantidade: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Total: R$ {totalPrice.toFixed(2)}</h2>
            <button
              onClick={clearCart}
              className="bg-gray-700 text-white px-6 py-2 mt-4 rounded hover:bg-gray-800 transition-colors"
            >
              Limpar Carrinho
            </button>
          </div>
        </>
      )}
    </div>
  );
}
