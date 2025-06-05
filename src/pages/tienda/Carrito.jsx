import React, { useEffect } from 'react';
import { useCart } from '../../components/common/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { TiendaHeader } from './Tienda';

const Carrito = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, p) => sum + (parseFloat(p.precio.replace(/[^\d.]/g, '')) * p.cantidad), 0);

  useEffect(() => {
    const globalHeader = document.querySelector('header.bg-card');
    if (globalHeader) globalHeader.style.display = 'none';
    return () => {
      if (globalHeader) globalHeader.style.display = '';
    };
  }, []);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f7f9]">
        <TiendaHeader />
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
    <div className="min-h-screen bg-[#f7f7f9]">
      <TiendaHeader />
      <main className="container mx-auto px-2 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Carrito de compras</h1>
        <div className="bg-white rounded shadow p-4 mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th>Producto</th>
                <th className="hidden sm:table-cell">Tienda</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((p, i) => (
                <tr key={i} className="border-b">
                  <td className="flex items-center gap-2 py-2">
                    <img src={p.imagen} alt={p.nombre} className="w-12 h-12 object-contain rounded border" />
                    <span className="font-semibold">{p.nombre}</span>
                  </td>
                  <td className="hidden sm:table-cell">{Array.isArray(p.tiendas) ? p.tiendas[0] : p.tienda}</td>
                  <td>Bs {parseFloat(p.precio.replace(/[^\d.]/g, '')).toFixed(2)}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQuantity(p.nombre, Math.max(1, p.cantidad-1))} className="px-2 py-1 bg-gray-200 rounded hover:bg-primary/20">-</button>
                      <input type="number" min="1" value={p.cantidad} onChange={e => updateQuantity(p.nombre, Math.max(1, parseInt(e.target.value)||1))} className="w-10 text-center border rounded" />
                      <button onClick={() => updateQuantity(p.nombre, p.cantidad+1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-primary/20">+</button>
                    </div>
                  </td>
                  <td>Bs {(parseFloat(p.precio.replace(/[^\d.]/g, '')) * p.cantidad).toFixed(2)}</td>
                  <td><button onClick={() => removeFromCart(p.nombre)} className="text-red-500 hover:underline">Quitar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded shadow p-4 mb-6">
          <div className="font-bold text-lg">Total: Bs {total.toFixed(2)}</div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button onClick={handlePagar} className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-primary/90 transition">Finalizar compra</button>
            <Link to="/tienda" className="text-primary underline">Seguir comprando</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Carrito;
