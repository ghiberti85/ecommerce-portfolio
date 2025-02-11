'use client';

import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'credit_card',
  });

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      toast.error('Preencha todos os campos!');
      return;
    }

    toast.success('Pagamento realizado com sucesso! 🎉');
    setTimeout(() => {
      clearCart();
      router.push('/');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Finalizar Compra</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Seu carrinho está vazio.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Resumo do Pedido</h2>
            <div className="divide-y divide-gray-700">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} width={50} height={50} className="rounded-lg" />
                    <span className="text-white">{item.name} (x{item.quantity})</span>
                  </div>
                  <span className="text-blue-400 font-medium">R$ {item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-lg font-bold text-white">Total: R$ {totalPrice.toFixed(2)}</div>
          </div>

          {/* Formulário de Checkout */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Informações do Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">Nome Completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Endereço de Entrega</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Forma de Pagamento</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="credit_card">💳 Cartão de Crédito</option>
                  <option value="pix">🔷 Pix</option>
                  <option value="cash">💵 Dinheiro na Entrega</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 transition"
              >
                <FaShoppingCart /> Finalizar Compra
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
