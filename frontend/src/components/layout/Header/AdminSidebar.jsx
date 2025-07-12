import React, { useState } from 'react';
// Usa el prefijo base para rutas absolutas
const BASE = '/Bolivia-ludica';
const menuItems = [
  { name: 'Dashboard', icon: '🏠', path: `${BASE}/admin` },
  { name: 'Productos', icon: '📦', path: `${BASE}/admin/productos` },
  { name: 'Pedidos', icon: '🧾', path: `${BASE}/admin/pedidos` },
  { name: 'Tiendas', icon: '🏬', path: `${BASE}/admin/tiendas` },
  { name: 'Usuarios', icon: '👤', path: `${BASE}/admin/usuarios` },
  { name: 'Clientes', icon: '🧑‍🤝‍🧑', path: `${BASE}/admin/clientes` },
  { name: 'Ranking', icon: '🏆', path: `${BASE}/admin/ranking` },
  { name: 'Contactos', icon: '✉️', path: `${BASE}/admin/contactos` },
  { name: 'Bolivia Juega', icon: '🎲', path: `${BASE}/admin/boliviajuega` }, // Nuevo enlace
];

const LOGO = `${BASE}/assets/image/LOGO-BOLIVIA-LUDICA.svg`;

const getCurrentPath = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  }
  return '';
};

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const currentPath = getCurrentPath();

  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (e.target.closest('#admin-sidebar') || e.target.closest('#sidebar-hamburger')) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <>
      {/* Botón hamburguesa solo en móvil, no ocupa espacio en escritorio */}
      <div className="block md:hidden">
        <button
          id="sidebar-hamburger"
          className="fixed top-4 left-4 z-30 bg-black text-white rounded-full p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-black/40"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen(!open)}
        >
          <span className="block w-6 h-0.5 bg-white mb-1 rounded transition-all" style={{transform: open ? 'rotate(45deg) translateY(7px)' : 'none'}}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 rounded transition-all ${open ? 'opacity-0' : ''}`}></span>
          <span className="block w-6 h-0.5 bg-white rounded transition-all" style={{transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none'}}></span>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        className={`bg-white text-black w-60 min-h-screen shadow-xl fixed left-0 top-0 z-20 flex flex-col md:static md:shadow-lg md:block transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col items-center py-8 border-b border-gray-200 mb-2">
          <img src={LOGO} alt="Logo" className="w-24 mb-3 drop-shadow-lg" />
          <h2 className="font-extrabold text-2xl mb-2 tracking-wide text-gray-800">Bolivia Lúdica</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-1 px-3">
            {menuItems.map(item => {
              const isActive = currentPath === item.path;
              return (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/40 focus:ring-offset-2 focus:bg-black/90 focus:text-white group
                      ${isActive ? 'bg-black text-white shadow-md scale-[1.03]' : 'hover:bg-black/90 hover:text-white hover:scale-[1.03] text-gray-800'}`}
                    tabIndex={0}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className={`text-xl transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto mb-6 px-6 text-xs text-gray-400 text-center select-none">
          © {new Date().getFullYear()} Bolivia Lúdica
        </div>
      </aside>
      {/* Fondo oscuro al abrir el menú en móvil */}
      {open && (
        <div className="fixed inset-0 bg-black/30 z-10 md:hidden" aria-hidden onClick={() => setOpen(false)}></div>
      )}
    </>
  );
};

export default AdminSidebar;
