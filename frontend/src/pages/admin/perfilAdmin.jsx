import React from 'react';
import { useAuth } from '../../components/common/AuthContext';

const PerfilAdmin = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Perfil del Administrador</h1>
      <div className="flex items-center gap-6 mb-6">
        <div className="bg-gradient-to-br from-black to-gray-700 text-white rounded-full w-20 h-20 flex items-center justify-center font-extrabold text-3xl border-2 border-black">
          {user?.nombre?.[0]?.toUpperCase() || 'A'}
        </div>
        <div>
          <div className="text-lg font-semibold">{user?.nombre || 'Administrador'}</div>
          <div className="text-gray-500">{user?.email || 'admin@correo.com'}</div>
        </div>
      </div>
      <div>
        <div className="mb-2"><span className="font-semibold">Usuario:</span> {user?.usuario || '-'}</div>
        <div className="mb-2"><span className="font-semibold">Rol:</span> {user?.rol || 'Administrador'}</div>
      </div>
    </div>
  );
};

export default PerfilAdmin;
