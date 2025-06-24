import React, { useEffect, useState } from 'react';
import { useCart } from '../../components/common/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { TiendaHeader } from './Tienda';
import { useAuth } from '../../components/common/AuthContext';
import LoginForm from '../../components/features/auth/LoginForm';
import UneteForm from '../../components/features/auth/UneteForm';
import Modal from '../../components/common/Modal';
import { createPedido } from '../../services/api';

const WHATSAPP_NUMBER = '59177429542'; // Reemplaza con el número de WhatsApp destino (formato internacional, sin +)

// Utilidad para obtener el precio numérico
function getPrecioNumber(precio) {
  if (typeof precio === 'number') return precio;
  if (typeof precio === 'string') return parseFloat(precio.replace(/[^\d.]/g, ''));
  return 0;
}

// Utilidad para obtener la imagen del producto o un placeholder
function getProductoImagen(p) {
  if (p.imagen && typeof p.imagen === 'string' && p.imagen.length > 3) return p.imagen;
  if (Array.isArray(p.imagenes) && p.imagenes.length > 0) return p.imagenes[0];
  return '/assets/image/placeholder-product.png';
}

const Carrito = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const total = cart.reduce((sum, p) => sum + (getPrecioNumber(p.precio) * p.cantidad), 0);

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
          <span className="text-xs text-gray-600">¿Buscas algo especial? Usa la búsqueda o explora nuestras categorías.</span>
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

  const handlePagar = async () => {
    if (!user) { setShowAuth(true); return; }
    // Preparar productos para el backend (deben tener _id de producto y cantidad)
    const productos = cart.map(p => ({ producto: p._id, cantidad: p.cantidad }));
    const pedidoData = {
      productos,
      total,
      direccionEntrega: user.direccion || '',
      nombreCliente: user.nombre || '',
      estado: 'pendiente',
    };
    try {
      await createPedido(pedidoData);
      // Guardar pedido en localStorage para la confirmación
      localStorage.setItem('ultimoPedido', JSON.stringify({
        numero: Math.floor(Math.random()*1000000),
        productos: cart.map(p => ({ nombre: p.nombre, cantidad: p.cantidad })),
        total,
        email: user.correo || user.email || ''
      }));
    } catch (err) {
      alert('Error al registrar el pedido. Intenta de nuevo.');
      return;
    }
    // Generar mensaje de WhatsApp
    const nombreUsuario = user?.nombre || user?.correo || 'Cliente';
    const productosMsg = cart.map(p => `• ${p.nombre} x${p.cantidad} (Bs ${getPrecioNumber(p.precio).toFixed(2)})`).join('%0A');
    const totalMsg = `Total: Bs ${total.toFixed(2)}`;
    const mensaje = `¡Hola!%0AMi nombre es ${nombreUsuario}.%0AQuiero realizar un pedido con los siguientes productos:%0A${productosMsg}%0A${totalMsg}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;
    window.open(url, '_blank');
    clearCart(); // Limpiar el carrito después de enviar
    // navigate('/confirmacion'); // Si tienes una página de confirmación, puedes redirigir después
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
                <tr key={i} className="border-b hover:bg-primary/5 transition group">
                  <td className="flex items-center gap-3 py-2 min-w-[180px]">
                    <img
                      src={getProductoImagen(p)}
                      alt={p.nombre + ' - imagen'}
                      className="w-14 h-14 object-contain rounded-lg border border-gray-200 shadow-sm bg-white group-hover:scale-105 transition-transform"
                      onError={e => { e.target.onerror = null; e.target.src = '/assets/image/placeholder-product.png'; }}
                    />
                    <span className="font-semibold text-gray-900 line-clamp-2">{p.nombre}</span>
                  </td>
                  <td className="hidden sm:table-cell text-gray-600">{Array.isArray(p.tiendas) ? p.tiendas[0] : p.tienda || '-'}</td>
                  <td className="text-primary font-bold">Bs {getPrecioNumber(p.precio).toFixed(2)}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(p.nombre, Math.max(1, p.cantidad-1))}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-primary/20 font-bold text-lg"
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
                        className="w-12 text-center border rounded focus:ring-2 focus:ring-primary font-semibold"
                        aria-label={`Cantidad de ${p.nombre}`}
                      />
                      <button
                        onClick={() => updateQuantity(p.nombre, p.cantidad+1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-primary/20 font-bold text-lg"
                        aria-label={`Aumentar cantidad de ${p.nombre}`}
                      >+</button>
                    </div>
                  </td>
                  <td className="font-semibold text-gray-800">Bs {(getPrecioNumber(p.precio) * p.cantidad).toFixed(2)}</td>
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
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded shadow p-4 mb-6 gap-2 border-t border-gray-100">
          <div className="font-bold text-lg flex items-center gap-2 text-gray-900">
            <span role="img" aria-label="paquete">📦</span> <span>Total:</span> <span className="text-primary">Bs {total.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-center">
            <button
              onClick={handlePagar}
              className={`bg-[#005a2b] text-white px-6 py-2 rounded font-bold hover:bg-[#007a3d] focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition flex-1 sm:flex-none ${(!user || cart.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!user || cart.length === 0}
              title={!user ? 'Debes iniciar sesión para finalizar la compra' : cart.length === 0 ? 'El carrito está vacío' : ''}
              aria-disabled={!user || cart.length === 0}
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
        </div>
        {!user && (
          <div className="text-base text-red-500 mb-6 w-full text-center font-semibold" role="alert">
            Debes iniciar sesión para finalizar la compra. Tu carrito se guarda localmente, pero solo los usuarios registrados pueden realizar pedidos.
          </div>
        )}
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
