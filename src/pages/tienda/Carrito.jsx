import React, { useEffect, useState } from 'react';
import { useCart } from '../../components/common/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { TiendaHeader } from './Tienda';
import { useAuth } from '../../components/common/AuthContext';
import LoginForm from '../../components/features/auth/LoginForm';
import UneteForm from '../../components/features/auth/UneteForm';
import Modal from '../../components/common/Modal';

const Carrito = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
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
      <div className="min-h-screen bg-[#f7f7f9] px-4">
        <TiendaHeader onLoginClick={() => setShowAuth(true)} />
        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 mt-8 max-w-md w-full mx-auto">
          {/* Shopping cart illustration (SVG) */}
          <svg width="96" height="96" fill="none" viewBox="0 0 96 96" className="mb-4 text-primary"><circle cx="48" cy="48" r="48" fill="#f3f4f6"/><path d="M32 72a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm32 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM28 24h4l8 32h24l8-24H36" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M36 56h24" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/></svg>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 text-center">¡Tu carrito está vacío!</h2>
          <p className="text-gray-600 mb-6 text-center">Parece que aún no has agregado productos. Descubre juegos y juguetes únicos en nuestra tienda.</p>
          <Link to="/tienda" className="bg-primary text-white px-6 py-2 rounded font-semibold shadow hover:bg-primary/90 transition mb-2 w-full text-center">Explorar tienda</Link>
          <span className="text-xs text-gray-400">¿Buscas algo especial? Usa la búsqueda o explora nuestras categorías.</span>
        </div>
        <Modal isOpen={showAuth} onClose={() => setShowAuth(false)} ariaLabel={showRegister ? 'Registro' : 'Iniciar sesión'}>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">{showRegister ? 'Crea tu cuenta' : 'Iniciar sesión'}</h2>
          {showRegister ? (
            <UneteForm onRegister={data => {login({ email: data.email, nombre: data.nombre || data.email }); setShowAuth(false);}} onShowLogin={() => setShowRegister(false)} />
          ) : (
            <LoginForm onLogin={async data => {const ok = await login(data); if (ok) setShowAuth(false); return ok;}} onShowRegister={() => setShowRegister(true)} />
          )}
        </Modal>
      </div>
    );
  }

  const handlePagar = () => {
    if (!user) { setShowAuth(true); return; }
    clearCart();
    navigate('/confirmacion');
  };

  return (
    <div className="min-h-screen bg-[#f7f7f9]">
      <TiendaHeader onLoginClick={() => setShowAuth(true)} />
      <main className="container mx-auto px-2 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <span role="img" aria-label="carrito">🛍️</span> Carrito de compras
        </h1>
        <h2 className="sr-only">Lista de productos en el carrito</h2>
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
                    <img
                      src={p.imagen}
                      alt={p.nombre + ' - imagen'}
                      className="w-12 h-12 object-contain rounded border shadow-sm"
                    />
                    <span className="font-semibold">{p.nombre}</span>
                  </td>
                  <td className="hidden sm:table-cell">{Array.isArray(p.tiendas) ? p.tiendas[0] : p.tienda}</td>
                  <td>Bs {parseFloat(p.precio.replace(/[^\d.]/g, '')).toFixed(2)}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(p.nombre, Math.max(1, p.cantidad-1))}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-primary/20"
                        aria-label={`Disminuir cantidad de ${p.nombre}`}
                        disabled={p.cantidad <= 1}
                      >-</button>
                      <label htmlFor={`cantidad-${i}`} className="sr-only">Cantidad de {p.nombre}</label>
                      <input
                        id={`cantidad-${i}`}
                        type="number"
                        min="1"
                        value={p.cantidad}
                        onChange={e => {
                          const val = Math.max(1, parseInt(e.target.value)||1);
                          updateQuantity(p.nombre, val);
                        }}
                        className="w-12 text-center border rounded focus:ring-2 focus:ring-primary"
                        aria-label={`Cantidad de ${p.nombre}`}
                      />
                      <button
                        onClick={() => updateQuantity(p.nombre, p.cantidad+1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-primary/20"
                        aria-label={`Aumentar cantidad de ${p.nombre}`}
                      >+</button>
                    </div>
                  </td>
                  <td>Bs {(parseFloat(p.precio.replace(/[^\d.]/g, '')) * p.cantidad).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => removeFromCart(p.nombre)}
                      className="flex items-center gap-1 text-red-700 font-semibold underline hover:bg-red-100 px-2 py-1 rounded transition"
                      aria-label={`Quitar ${p.nombre} del carrito`}
                    >
                      <span role="img" aria-label="Eliminar">🗑️</span> Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded shadow p-4 mb-6 gap-2">
          <div className="font-bold text-lg flex items-center gap-2">
            <span role="img" aria-label="paquete">📦</span> Total: Bs {total.toFixed(2)}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handlePagar}
              className={`bg-[#005a2b] text-white px-6 py-2 rounded font-bold hover:bg-[#007a3d] focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition flex-1 sm:flex-none ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={cart.length === 0}
              title={!user ? 'Debes iniciar sesión para finalizar la compra' : ''}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              Finalizar compra
            </button>
            <Link
              to="/tienda"
              className="bg-primary/10 text-primary px-6 py-2 rounded font-bold hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition flex-1 sm:flex-none border border-primary/30 text-center"
              style={{ minWidth: '150px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              Seguir comprando
            </Link>
          </div>
          {!user && (
            <div className="text-xs text-red-500 mt-2 w-full text-center">Debes iniciar sesión para finalizar la compra.</div>
          )}
        </div>
      </main>
      <Modal isOpen={showAuth} onClose={() => setShowAuth(false)} ariaLabel={showRegister ? 'Registro' : 'Iniciar sesión'}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">{showRegister ? 'Crea tu cuenta' : 'Iniciar sesión'}</h2>
        {showRegister ? (
          <UneteForm onRegister={data => {login({ email: data.email, nombre: data.nombre || data.email }); setShowAuth(false);}} onShowLogin={() => setShowRegister(false)} />
        ) : (
          <LoginForm onLogin={async data => {const ok = await login(data); if (ok) setShowAuth(false); return ok;}} onShowRegister={() => setShowRegister(true)} />
        )}
      </Modal>
    </div>
  );
};

export default Carrito;
