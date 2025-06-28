import React, { useState, useEffect } from 'react';
import ProductoCard from "../../components/ProductoCard";
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/features/auth/LoginForm';
import UneteForm from '../../components/features/auth/UneteForm';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../components/common/AuthContext';
import { useCart } from '../../components/common/CartContext';

const API_URL = import.meta.env.VITE_API_URL || '';

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const categorias = [
  'Juegos de Mesa',
  'Cartas TCG',
  'Accesorios',
  'Juegos Infantiles',
  'Juegos de Rol',
  'Ropa',
  'Otros',
];

// Normaliza texto para búsqueda insensible a mayúsculas/minúsculas y acentos
function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s-]/g, '');
}

const Tienda = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [showAuth, setShowAuth] = useState(false); // Mostrar modal login/registro
  const [showRegister, setShowRegister] = useState(false);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar productos desde la API
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API_URL}/productos`);
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        setProductos([]);
      }
      setLoading(false);
    };
    fetchProductos();
  }, []);

  // Filtrado solo por categoría y búsqueda
  const productosFiltrados = productos.filter(p => {
    const coincideCategoria = categoriaSeleccionada ? (Array.isArray(p.categoria) ? p.categoria.includes(categoriaSeleccionada) : p.categoria === categoriaSeleccionada) : true;
    const coincideBusqueda = normalizeText(p.nombre).includes(normalizeText(busqueda));
    return coincideCategoria && coincideBusqueda;
  });

  const { login } = useAuth();
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  const handleLogin = async (data) => {
    setAuthError('');
    setAuthSuccess('');
    try {
      // Llamada real al backend para login
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: data.correo, contraseña: data.contraseña })
      });
      const result = await res.json();
      if (res.ok && result.usuario && result.usuario.rol === 'cliente') {
        login({ ...result.usuario, token: result.token });
        setShowAuth(false);
        setAuthSuccess('¡Bienvenido!');
        return true;
      } else if (res.ok && result.usuario) {
        setAuthError('Solo los clientes pueden iniciar sesión en la tienda.');
      } else {
        setAuthError(result.msg || 'Usuario o contraseña incorrectos.');
      }
    } catch (err) {
      setAuthError('Error de red al iniciar sesión.');
    }
    return false;
  };

  const handleRegister = async (data) => {
    setAuthError('');
    setAuthSuccess('');
    try {
      // Registro real en backend, forzando rol cliente (ruta pública)
      const res = await fetch(`${API_URL}/usuarios/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          rol: 'cliente',
          contraseña: data.password || data.contraseña // compatibilidad con ambos nombres
        })
      });
      const result = await res.json();
      if (res.ok) {
        setAuthSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setShowRegister(false); // Cambia al formulario de login
      } else {
        setAuthError(result.msg || 'Error al registrar usuario');
      }
    } catch (err) {
      setAuthError('Error de red al registrar usuario');
    }
  };

  const handleShowAuth = (register = false) => {
    setShowRegister(register);
    setShowAuth(true);
    setAuthError('');
    setAuthSuccess('');
  };

  return (
    <div className="min-h-screen bg-[#f7f7f9]">
      <TiendaHeader 
        
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        onLoginClick={handleShowAuth}
      />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 tracking-wide">PRODUCTOS DESTACADOS</h1>
        {/* Filtros de categoría */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <select
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            value={categoriaSeleccionada}
            onChange={e => setCategoriaSeleccionada(e.target.value)}
            aria-label="Filtrar por categoría"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-10">Cargando productos...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productosFiltrados.map((producto, idx) => (
              <Link key={producto._id || idx} to={`/tienda/${slugify(producto.nombre)}`} aria-label={`Ver detalles de ${producto.nombre}`} title={`Ver detalles de ${producto.nombre}`}>
                <ProductoCard producto={producto} headingLevel={2} />
              </Link>
            ))}
          </div>
        )}
      </main>
      {/* Modal de login/registro */}
      <Modal isOpen={showAuth} onClose={() => setShowAuth(false)} ariaLabel={showRegister ? 'Registro' : 'Iniciar sesión'}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">{showRegister ? 'Crea tu cuenta' : 'Iniciar sesión'}</h2>
        {authError && (
          <div className="mb-2 text-center text-xs text-red-600 font-semibold bg-red-50 border border-red-200 rounded p-2">{authError}</div>
        )}
        {authSuccess && (
          <div className="mb-2 text-center text-xs text-green-700 font-semibold bg-green-50 border border-green-200 rounded p-2">{authSuccess}</div>
        )}
        {showRegister ? (
          <UneteForm onRegister={handleRegister} onShowLogin={() => setShowRegister(false)} />
        ) : (
          <LoginForm onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
        )}
      </Modal>
    </div>
  );
};

export const TiendaHeader = ({ busqueda, setBusqueda, onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm w-full sticky top-0 z-50 border-b border-gray-100 mb-8">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 relative">
        <div className="flex items-center gap-3">
          <img src={import.meta.env.BASE_URL + 'assets/image/LOGO-BOLIVIA-LUDICA.svg'} alt="Bolivia Ludica Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold tracking-wide text-gray-900">BOLIVIA LUDICA TIENDA</span>
        </div>
        {/* Hamburguesa */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className={`block w-6 h-0.5 bg-black mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        {/* Menú navegación */}
        <nav className={`hidden md:flex gap-6 text-sm font-medium items-center`}>
          <Link to="/tienda" className="text-gray-700 hover:text-primary transition">Inicio</Link>
          <Link to="/sobre-nosotros" className="text-gray-700 hover:text-primary transition">Sobre Nosotros</Link>
        </nav>
        {/* Menú móvil */}
        {menuOpen && (
          <nav className="fixed inset-0 bg-black/40 z-40 flex flex-col md:hidden">
            <div className="bg-white shadow-md flex flex-col gap-2 p-6 w-3/4 max-w-xs h-full animate-fadeIn">
              <Link to="/tienda" className="text-gray-700 hover:text-primary transition py-2" onClick={() => setMenuOpen(false)}>Inicio</Link>
              <Link to="/sobre-nosotros" className="text-gray-700 hover:text-primary transition py-2" onClick={() => setMenuOpen(false)}>Sobre Nosotros</Link>
              <div className="border-t my-2" />
              <div className="border-t my-2" />
              <button onClick={() => { setMenuOpen(false); onLoginClick(); }} className="text-gray-700 hover:text-primary transition flex items-center gap-1 py-2">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                Iniciar sesión
              </button>
            </div>
            <div className="flex-1" onClick={() => setMenuOpen(false)} />
          </nav>
        )}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Buscar producto..."
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary pl-8 w-40"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              aria-label="Buscar producto"
            />
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </div>
          <Link
            to="/carrito"
            className="relative group flex items-center justify-center rounded-full p-2 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:bg-primary/10"
            aria-label="Ver carrito"
            title="Carrito"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="text-gray-700 group-hover:text-primary transition"><path d="M6 6h15l-1.5 9h-13z" /><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /></svg>
            {cart.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-xs rounded-full px-1.5 py-0.5 shadow font-bold">{cart.length}</span>}
          </Link>
          {user ? (
            <>
              <Link
                to="/perfil"
                className="relative group flex items-center gap-2 rounded-full p-2 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:bg-primary/10"
                aria-label="Ir a perfil de usuario"
                title="Perfil"
              >
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="text-gray-700 group-hover:text-primary transition"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                <span className="hidden lg:inline font-semibold text-gray-700 group-hover:text-primary transition">Perfil</span>
              </Link>
              <button
                onClick={async () => { await logout(); navigate('/tienda', { replace: true }); }}
                className="flex items-center gap-2 rounded-full p-2 ml-1 text-gray-600 hover:text-white hover:bg-red-500 transition focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 font-semibold"
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="text-gray-600 group-hover:text-white transition"><path d="M16 17l5-5m0 0l-5-5m5 5H9" /><path d="M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" /></svg>
                <span className="hidden lg:inline">Salir</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onLoginClick(false)}
                className="flex items-center gap-2 rounded-full p-2 text-gray-600 hover:text-primary hover:bg-primary/10 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-semibold"
                aria-label="Iniciar sesión"
                title="Iniciar sesión"
              >
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="text-gray-700 group-hover:text-primary transition"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                <span className="hidden lg:inline">Iniciar sesión</span>
              </button>
              <button
                onClick={() => onLoginClick(true)}
                className="flex items-center gap-2 rounded-full p-2 text-gray-600 hover:text-green-600 hover:bg-green-100 transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 font-semibold ml-2"
                aria-label="Registrarse"
                title="Registrarse"
              >
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="text-gray-700 group-hover:text-green-600 transition"><circle cx="12" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" /></svg>
                <span className="hidden lg:inline">Registrarse</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Tienda;