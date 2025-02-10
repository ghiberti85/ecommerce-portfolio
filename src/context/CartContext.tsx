'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  savedForLater: CartItem[];
  addToCart: (item: CartItem) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  saveForLater: (item: CartItem) => void;
  moveToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);

  // 🔄 Carregar o carrinho e os itens salvos do localStorage ao iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedSaved = localStorage.getItem('savedForLater');
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedSaved) setSavedForLater(JSON.parse(storedSaved));
  }, []);

  // 💾 Atualizar `localStorage` sempre que o carrinho for modificado
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // 💾 Atualizar `localStorage` sempre que os itens salvos forem modificados
  useEffect(() => {
    localStorage.setItem('savedForLater', JSON.stringify(savedForLater));
  }, [savedForLater]);

  // 🛒 Adicionar item ao carrinho
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // ➖ Diminuir a quantidade do item no carrinho
  const decreaseQuantity = (id: string) => {
    setCart((prevCart) =>
      prevCart
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  // ❌ Remover item do carrinho
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== id));
  };

  // 🗑️ Esvaziar carrinho
  const clearCart = () => {
    setCart([]);
  };

  // ⭐ Salvar para mais tarde
  const saveForLater = (item: CartItem) => {
    setSavedForLater((prevSaved) => [...prevSaved, item]);
    removeFromCart(item.id);
  };

  // 🔄 Mover de volta para o carrinho
  const moveToCart = (item: CartItem) => {
    addToCart(item);
    setSavedForLater((prevSaved) => prevSaved.filter((i) => i.id !== item.id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        savedForLater,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        saveForLater,
        moveToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar o carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
