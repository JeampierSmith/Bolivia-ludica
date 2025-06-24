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
      const idx = prev.findIndex(p => p._id === producto._id);
      let nuevo;
      if (idx >= 0) {
        nuevo = [...prev];
        nuevo[idx].cantidad += cantidad;
      } else {
        // Asegura que el producto tenga _id
        const prodConId = { ...producto };
        if (!prodConId._id && producto.id) prodConId._id = producto.id;
        nuevo = [...prev, { ...prodConId, cantidad }];
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
  const updateQuantity = (nombre, cantidad) => {
    setCart(prev => {
      const nuevo = prev.map(p =>
        p.nombre === nombre ? { ...p, cantidad: Math.max(1, cantidad) } : p
      );
      localStorage.setItem('bludica_cart', JSON.stringify(nuevo));
      return nuevo;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
