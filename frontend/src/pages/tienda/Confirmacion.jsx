import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import LoginForm from '../../components/features/auth/LoginForm';
import UneteForm from '../../components/features/auth/UneteForm';
import { useAuth } from '../../components/common/AuthContext';

const Confirmacion = () => {
  const { login } = useAuth();
  const [showAuth, setShowAuth] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);
  const [redirectTimeout, setRedirectTimeout] = React.useState(null);
  const [redirecting, setRedirecting] = React.useState(false);
  const [cancelRedirect, setCancelRedirect] = React.useState(false);

  // Obtener datos del pedido desde localStorage (o puedes usar context/props si lo prefieres)
  const pedido = React.useMemo(() => {
    try {
      const data = JSON.parse(localStorage.getItem('ultimoPedido'));
      if (data && Array.isArray(data.productos) && data.total) return data;
    } catch {}
    return { numero: 'N/A', productos: [], total: 0, email: '' };
  }, []);

  useEffect(() => {
    const globalHeader = document.querySelector('header.bg-card');
    if (globalHeader) globalHeader.style.display = 'none';
    return () => {
      if (globalHeader) globalHeader.style.display = '';
    };
  }, []);

  React.useEffect(() => {
    if (!cancelRedirect) {
      const timeout = setTimeout(() => {
        setRedirecting(true);
        window.location.href = '/perfil';
      }, 10000);
      setRedirectTimeout(timeout);
      return () => clearTimeout(timeout);
    }
  }, [cancelRedirect]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mb-4 animate-bounce-in">
        <span className="text-6xl mb-2" role="img" aria-label="compra exitosa">✅</span>
        <h1 className="text-3xl font-bold text-green-700 mb-1">¡Compra realizada con éxito!</h1>
        <div className="text-lg text-gray-700 font-semibold mb-2">¡Gracias por apoyar a la comunidad lúdica! <span role="img" aria-label="dado">🎲</span></div>
      </div>
      <div className="bg-white rounded shadow p-6 w-full max-w-md mb-6 text-center animate-fadeIn">
        <h2 className="text-xl font-bold mb-4 text-foreground">Resumen de tu pedido</h2>
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-1">N° de pedido: <span className="font-mono text-black">{pedido.numero}</span></div>
          <ul className="text-sm text-gray-700 mb-1 flex flex-col items-center">
            {pedido.productos.map((prod, idx) => (
              <li key={idx}>• {prod.nombre} <span className="text-gray-500">x{prod.cantidad}</span></li>
            ))}
          </ul>
          <div className="text-base font-bold text-green-700 mb-1">Total: Bs {pedido.total}</div>
          {pedido.email && <div className="text-xs text-gray-500">Confirmación enviada a <span className="font-mono">{pedido.email}</span></div>}
        </div>
        <p className="mb-2">Gracias por tu compra. Pronto recibirás un correo con los detalles de tu pedido.</p>
        <p className="mb-2">Puedes seguir comprando o revisar tu perfil.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center mb-2">
        <Link to="/tienda" className="bg-[#005a2b] text-white px-6 py-2 rounded font-bold hover:bg-[#007a3d] focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition text-center flex-1 shadow-lg text-lg" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>Volver a la tienda</Link>
        <Link to="/perfil" className="bg-primary/10 text-primary px-6 py-2 rounded font-bold hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition text-center flex-1 border border-primary/30 text-lg flex items-center justify-center gap-2" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <span role="img" aria-label="perfil">👤</span> Ir a mi perfil
        </Link>
      </div>
      {!redirecting && (
        <div className="text-xs text-gray-500 mt-2 text-center">
          Serás redirigido automáticamente a tu perfil en 10 segundos.
          <button onClick={() => { setCancelRedirect(true); if (redirectTimeout) clearTimeout(redirectTimeout); }} className="ml-2 underline text-primary hover:text-primary/80">Cancelar</button>
        </div>
      )}
      {/* Modal de login/registro unificado */}
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

export default Confirmacion;
