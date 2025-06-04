import React from 'react';
import { useAuth } from '../../components/common/AuthContext';
import { Link } from 'react-router-dom';

const Perfil = () => {
  const { user, logout } = useAuth();
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">No has iniciado sesión</h2>
        <Link to="/tienda" className="text-primary underline">Volver a la tienda</Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Perfil de usuario</h1>
      <div className="bg-white rounded shadow p-6 w-full max-w-md mb-6">
        <div className="mb-2"><b>Nombre:</b> {user.nombre || user.email}</div>
        <div className="mb-2"><b>Email:</b> {user.email}</div>
        <div className="mb-2"><b>Miembro desde:</b> 2025</div>
      </div>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition mb-4">Cerrar sesión</button>
      <Link to="/tienda" className="text-primary underline">Volver a la tienda</Link>
    </div>
  );
};

export default Perfil;
