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
    complement: '',
    cep: '',
    paymentMethod: 'credit_card',
    installments: '1',
  });

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.address || !formData.cep) {
      toast.error('Preencha todos os campos obrigatórios!');
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
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Resumo do Pedido</h2>
            <div className="divide-y divide-gray-700">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} width={50} height={50} className="rounded-lg" />
                    <span className="text-white">{item.name} ({item.quantity})</span>
                  </div>
                  <span className="text-blue-400 font-medium"><span className="text-white">{item.quantity} x</span> R$ {item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-lg font-bold text-white text-right ">Total: R$ {totalPrice.toFixed(2)}</div>
          </div>

          {/* Formulário de Checkout */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Informações do Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Endereço de Entrega *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Complemento (opcional)</label>
                <input
                  type="text"
                  name="complement"
                  value={formData.complement}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">CEP *</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleInputChange}
                  maxLength={9}
                  placeholder="00000-000"
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Forma de Pagamento *</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="credit_card">💳 Cartão de Crédito</option>
                  <option value="debit_card">🏦 Cartão de Débito</option>
                  <option value="boleto">📄 Boleto Bancário</option>
                  <option value="pix">🔷 Pix</option>
                </select>
              </div>

              {/* Opções de parcelamento (somente para cartão de crédito) */}
              {formData.paymentMethod === 'credit_card' && (
                <div>
                  <label className="block text-gray-400 mb-1">Parcelamento</label>
                  <select
                    name="installments"
                    value={formData.installments}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}x de R$ {(totalPrice / (i + 1)).toFixed(2)} sem juros
                      </option>
                    ))}
                  </select>
                </div>
              )}

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
