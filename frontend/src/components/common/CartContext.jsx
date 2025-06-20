import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('bludica_cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const addToCart = (producto, cantidad = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.nombre === producto.nombre);
      let nuevo;
      if (idx >= 0) {
        nuevo = [...prev];
        nuevo[idx].cantidad += cantidad;
      } else {
        nuevo = [...prev, { ...producto, cantidad }];
      }
      localStorage.setItem('bludica_cart', JSON.stringify(nuevo));
      return nuevo;
    });
  };
  const removeFromCart = (nombre) => {
    setCart(prev => {
      const nuevo = prev.filter(p => p.nombre !== nombre);
      localStorage.setItem('bludica_cart', JSON.stringify(nuevo));
      return nuevo;
    });
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('bludica_cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
