import React, { useState, useEffect } from 'react';
import ProductoCard from "../../components/ProductoCard";
import { Link } from 'react-router-dom';
import LoginForm from '../../components/features/auth/LoginForm';
import UneteForm from '../../components/features/auth/UneteForm';
import Modal from '../../components/common/Modal';
import productos from './TiendaProductos';

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

const Tienda = () => {
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [showAuth, setShowAuth] = useState(false); // Mostrar modal login/registro
  const [showRegister, setShowRegister] = useState(false);

  // Filtrado por departamento y búsqueda
  const productosFiltrados = productos.filter(p => {
    const coincideDepto = departamentoSeleccionado ? p.departamento === departamentoSeleccionado : true;
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideDepto && coincideBusqueda;
  });

  useEffect(() => {
    const globalHeader = document.querySelector('header.bg-card');
    if (globalHeader) { globalHeader.style.display = 'none'; }
    return () => {
      if (globalHeader) { globalHeader.style.display = ''; }
    };
  }, []);

  // Opcional: manejar login/register
  const handleLogin = (data) => {
    // Aquí iría la lógica para manejar el inicio de sesión
    console.log('Login:', data);
    setShowAuth(false);
  };
  const handleRegister = (data) => {
    // Aquí iría la lógica para manejar el registro
    console.log('Registro:', data);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productosFiltrados.map((producto, idx) => (
            <Link key={idx} to={`/tienda/${slugify(producto.nombre)}`}>
              <ProductoCard producto={producto} />
            </Link>
          ))}
        </div>
      </main>
      {/* Modal de login/registro */}
      <Modal isOpen={showAuth} onClose={() => setShowAuth(false)} ariaLabel={showRegister ? 'Registro' : 'Iniciar sesión'}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">{showRegister ? 'Crea tu cuenta' : 'Iniciar sesión'}</h2>
        {showRegister ? (
          <UneteForm onRegister={handleRegister} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
        <div className="text-center text-sm mt-4">
          {showRegister ? (
            <>
              ¿Ya tienes una cuenta?{' '}
              <button type="button" className="font-medium text-primary hover:text-primary/80" onClick={() => setShowRegister(false)}>
                Inicia sesión aquí
              </button>
            </>
          ) : (
            <>
              ¿No tienes una cuenta?{' '}
              <button type="button" className="font-medium text-primary hover:text-primary/80" onClick={() => setShowRegister(true)}>
                Regístrate aquí
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

// Header modificado para recibir props de filtro y búsqueda y login
const TiendaHeader = ({ departamentoSeleccionado, setDepartamentoSeleccionado, busqueda, setBusqueda, onLoginClick }) => (
  <header className="bg-white shadow-sm w-full sticky top-0 z-50 border-b border-gray-100 mb-8">
    <div className="container mx-auto flex items-center justify-between py-4 px-4">
      <div className="flex items-center gap-3">
        <img src={import.meta.env.BASE_URL + 'assets/image/LOGO-BOLIVIA-LUDICA.svg'} alt="Bolivia Ludica Logo" className="h-10 w-auto" />
        <span className="text-2xl font-bold tracking-wide text-gray-900">BOLIVIA LUDICA TIENDA</span>
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
        <a href="/" className="text-gray-700 hover:text-primary transition">Inicio</a>
        <a href="#" className="text-gray-700 hover:text-primary transition">Juegos de Mesa</a>
        <a href="#" className="text-gray-700 hover:text-primary transition">Cartas TCG</a>
        <a href="#" className="text-gray-700 hover:text-primary transition">Sobre Nosotros</a>
        
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
      
      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary pl-8 w-40"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        </div>
        
        <button className="text-gray-600 hover:text-primary transition">
           <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-13z" /><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /></svg>
        </button>

        <button onClick={onLoginClick} className="text-gray-600 hover:text-primary transition flex items-center gap-1">
           <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
           Iniciar sesión
        </button>
      </div>
    </div>
  </header>
);

export default Tienda;