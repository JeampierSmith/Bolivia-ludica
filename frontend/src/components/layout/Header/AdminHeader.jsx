import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../common/AuthContext';

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Cierra el menú si se hace clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleProfile = () => {
    setMenuOpen(false);
    navigate('/admin/perfil');
  };
  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-10">
      <div className="font-extrabold text-2xl tracking-wide flex items-center gap-2">
        <span className="hidden sm:inline">Panel de Administración</span>
        <span className="inline sm:hidden">Admin</span>
      </div>
      <div className="flex items-center gap-3 relative" ref={menuRef}>
        <span className="mr-1 text-sm font-semibold hidden sm:inline truncate max-w-[120px]">{user?.nombre || 'admin'}</span>
        <button
          className="bg-gradient-to-br from-white to-gray-200 text-black rounded-full w-10 h-10 flex items-center justify-center font-extrabold text-lg border-2 border-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition-transform hover:scale-110"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú de usuario"
        >
          {user?.nombre?.[0]?.toUpperCase() || 'A'}
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-12 w-44 bg-white text-black rounded-xl shadow-2xl z-20 animate-fade-in overflow-hidden border border-gray-200">
            <button
              className="block w-full text-left px-5 py-3 hover:bg-gray-100 font-medium text-base transition-colors"
              onClick={handleProfile}
            >
              <span role="img" aria-label="perfil" className="mr-2">👤</span> Ver perfil
            </button>
            <button
              className="block w-full text-left px-5 py-3 hover:bg-gray-100 border-t font-medium text-base transition-colors"
              onClick={handleLogout}
            >
              <span role="img" aria-label="logout" className="mr-2">🚪</span> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
