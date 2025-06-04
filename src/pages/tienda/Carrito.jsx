import React from 'react';
import { useCart } from '../../components/common/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Carrito = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, p) => sum + (parseFloat(p.precio.replace(/[^\d.]/g, '')) * p.cantidad), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <Link to="/tienda" className="text-primary underline">Volver a la tienda</Link>
      </div>
    );
  }

  const handlePagar = () => {
    clearCart();
    navigate('/confirmacion');
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Carrito de compras</h1>
      <div className="bg-white rounded shadow p-6 w-full max-w-lg mb-6">
        {cart.map((p, i) => (
          <div key={i} className="flex items-center justify-between border-b py-2">
            <div>
              <div className="font-semibold">{p.nombre}</div>
              <div className="text-sm text-gray-500">{p.precio} x {p.cantidad}</div>
            </div>
            <button onClick={() => removeFromCart(p.nombre)} className="text-red-500 hover:underline">Quitar</button>
          </div>
        ))}
        <div className="font-bold text-lg mt-4">Total: Bs {total.toFixed(2)}</div>
      </div>
      <button onClick={handlePagar} className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-primary/90 transition mb-4">Pagar</button>
      <Link to="/tienda" className="text-primary underline">Seguir comprando</Link>
    </div>
  );
};

export default Carrito;
