import React, { useState, useEffect } from 'react';
import ProductoCard from "../../components/ProductoCard";
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/features/auth/LoginForm';
import UneteForm from '../../components/features/auth/UneteForm';
import Modal from '../../components/common/Modal';
import productos from './TiendaProductos';
import { useAuth } from '../../components/common/AuthContext';
import { useCart } from '../../components/common/CartContext';

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Productos de ejemplo con tiendas y departamentos reales
const departamentos = [
  'Cochabamba',
  'La Paz',
  'Santa Cruz',
  'Oruro',
  'Potosí',
  'Sucre',
  'Tarija',
];

const categorias = [
  'Juegos de Mesa',
  'Cartas TCG',
  'Accesorios',
  'Juegos Infantiles',
  'Juegos de Rol',
  'Ropa',
  'Otros',
];

const Tienda = () => {
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [showAuth, setShowAuth] = useState(false); // Mostrar modal login/registro
  const [showRegister, setShowRegister] = useState(false);

  // Filtrado por departamento, categoría y búsqueda
  const productosFiltrados = productos.filter(p => {
    const coincideDepto = departamentoSeleccionado ? (Array.isArray(p.departamentos) ? p.departamentos.includes(departamentoSeleccionado) : p.departamento === departamentoSeleccionado) : true;
    const coincideCategoria = categoriaSeleccionada ? (Array.isArray(p.categoria) ? p.categoria.includes(categoriaSeleccionada) : p.categoria === categoriaSeleccionada) : true;
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideDepto && coincideCategoria && coincideBusqueda;
  });

  useEffect(() => {
    const globalHeader = document.querySelector('header.bg-card');
    if (globalHeader) globalHeader.style.display = 'none';
    return () => {
      if (globalHeader) globalHeader.style.display = '';
    };
  }, []);

  // Opcional: manejar login/register
  const { login } = useAuth();
  const handleLogin = async (data) => {
    // TEMPORAL: Solo permite usuario y contraseña 'admin@gmail.com' para probar el frontend
    const ok = await login(data);
    if (ok) {
      setShowAuth(false);
      return true;
    }
    return false;
  };
  const handleRegister = (data) => {
    // Simulación de registro: guardar usuario en contexto
    login({ email: data.email, nombre: data.nombre || data.email });
    setShowAuth(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f9]">
      <TiendaHeader 
        departamentoSeleccionado={departamentoSeleccionado}
        setDepartamentoSeleccionado={setDepartamentoSeleccionado}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        onLoginClick={() => setShowAuth(true)}
      />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 tracking-wide">PRODUCTOS DESTACADOS</h1>
        {/* Filtros visibles */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {/* Filtros de departamento */}
          <div className="flex flex-wrap gap-2">
            <span className="font-semibold text-gray-700 mr-2">Departamento:</span>
            <button
              className={`px-3 py-1 rounded-full border text-sm font-medium transition ${!departamentoSeleccionado ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:bg-primary/10'}`}
              onClick={() => setDepartamentoSeleccionado('')}
            >
              Todos
            </button>
            {departamentos.map(d => (
              <button
                key={d}
                className={`px-3 py-1 rounded-full border text-sm font-medium transition ${departamentoSeleccionado === d ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:bg-primary/10'}`}
                onClick={() => setDepartamentoSeleccionado(d)}
              >
                {d}
              </button>
            ))}
          </div>
          {/* Filtros de categoría */}
          <div className="flex flex-wrap gap-2 ml-6">
            <span className="font-semibold text-gray-700 mr-2">Categoría:</span>
            <button
              className={`px-3 py-1 rounded-full border text-sm font-medium transition ${!categoriaSeleccionada ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:bg-primary/10'}`}
              onClick={() => setCategoriaSeleccionada('')}
            >
              Todas
            </button>
            {categorias.map(c => (
              <button
                key={c}
                className={`px-3 py-1 rounded-full border text-sm font-medium transition ${categoriaSeleccionada === c ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:bg-primary/10'}`}
                onClick={() => setCategoriaSeleccionada(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productosFiltrados.map((producto, idx) => (
            <Link key={idx} to={`/tienda/${slugify(producto.nombre)}`} aria-label={`Ver detalles de ${producto.nombre}`} title={`Ver detalles de ${producto.nombre}`}>
              <ProductoCard producto={producto} headingLevel={2} />
            </Link>
          ))}
        </div>
      </main>
      {/* Modal de login/registro */}
      <Modal isOpen={showAuth} onClose={() => setShowAuth(false)} ariaLabel={showRegister ? 'Registro' : 'Iniciar sesión'}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">{showRegister ? 'Crea tu cuenta' : 'Iniciar sesión'}</h2>
        {showRegister ? (
          <UneteForm onRegister={handleRegister} onShowLogin={() => setShowRegister(false)} />
        ) : (
          <LoginForm onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
        )}
      </Modal>
    </div>
  );
};

export const TiendaHeader = ({ departamentoSeleccionado, setDepartamentoSeleccionado, busqueda, setBusqueda, onLoginClick }) => {
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
          <div className="relative group">
            <button className="text-gray-700 hover:text-primary transition focus:outline-none flex items-center px-3 py-1 border border-gray-300 rounded-md bg-white shadow-sm">
              {departamentoSeleccionado || 'Departamento'} <span className="ml-1 text-xs">▼</span>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-20 max-h-60 overflow-y-auto">
              <button onClick={() => setDepartamentoSeleccionado('')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${!departamentoSeleccionado ? 'font-bold text-primary' : 'text-gray-700'}`}>Todos</button>
              {departamentos.map((d) => (
                <button
                  key={d}
                  onClick={() => setDepartamentoSeleccionado(d)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${departamentoSeleccionado === d ? 'font-bold text-primary' : 'text-gray-700'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </nav>
        {/* Menú móvil */}
        {menuOpen && (
          <nav className="fixed inset-0 bg-black/40 z-40 flex flex-col md:hidden">
            <div className="bg-white shadow-md flex flex-col gap-2 p-6 w-3/4 max-w-xs h-full animate-fadeIn">
              <Link to="/tienda" className="text-gray-700 hover:text-primary transition py-2" onClick={() => setMenuOpen(false)}>Inicio</Link>
              <Link to="/sobre-nosotros" className="text-gray-700 hover:text-primary transition py-2" onClick={() => setMenuOpen(false)}>Sobre Nosotros</Link>
              <div className="border-t my-2" />
              <div className="relative">
                <button className="text-gray-700 hover:text-primary transition focus:outline-none flex items-center px-3 py-1 border border-gray-300 rounded-md bg-white shadow-sm w-full" onClick={() => setMenuOpen(false)}>
                  {departamentoSeleccionado || 'Departamento'} <span className="ml-1 text-xs">▼</span>
                </button>
                <div className="mt-2 w-full bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto">
                  <button onClick={() => { setDepartamentoSeleccionado(''); setMenuOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${!departamentoSeleccionado ? 'font-bold text-primary' : 'text-gray-700'}`}>Todos</button>
                  {departamentos.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setDepartamentoSeleccionado(d); setMenuOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${departamentoSeleccionado === d ? 'font-bold text-primary' : 'text-gray-700'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
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
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 rounded-full p-2 text-gray-600 hover:text-primary hover:bg-primary/10 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-semibold"
              aria-label="Iniciar sesión"
              title="Iniciar sesión"
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="text-gray-700 group-hover:text-primary transition"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              <span className="hidden lg:inline">Iniciar sesión</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Tienda;