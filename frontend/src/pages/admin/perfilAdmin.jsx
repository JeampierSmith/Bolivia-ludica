import React, { useState } from 'react';
import { useAuth } from '../../components/common/AuthContext';
import { updateUsuario } from '../../services/usuarioService';

const PerfilAdmin = () => {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ contraseña: '', confirmar: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    if (!form.contraseña || !form.confirmar) {
      setMsg('Completa ambos campos de contraseña.');
      return;
    }
    if (form.contraseña !== form.confirmar) {
      setMsg('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      await updateUsuario(user._id, { contraseña: form.contraseña });
      setMsg('Contraseña actualizada correctamente.');
      setForm({ contraseña: '', confirmar: '' });
    } catch (err) {
      setMsg('Error al actualizar: ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Perfil del Administrador</h1>
      <div className="flex items-center gap-6 mb-6">
        <div className="bg-gradient-to-br from-black to-gray-700 text-white rounded-full w-20 h-20 flex items-center justify-center font-extrabold text-3xl border-2 border-black">
          {user?.nombre?.[0]?.toUpperCase() || 'A'}
        </div>
        <div>
          <div className="text-lg font-semibold">{user?.nombre || 'Administrador'}</div>
          <div className="text-gray-500">{user?.correo || user?.email || 'admin@correo.com'}</div>
        </div>
      </div>
      <div>
        <div className="mb-2"><span className="font-semibold">Correo:</span> {user?.correo || user?.email || '-'}</div>
        <div className="mb-2"><span className="font-semibold">Rol:</span> {user?.rol || 'Administrador'}</div>
      </div>
      <form className="mt-8" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">Cambiar contraseña</h2>
        <div className="mb-4">
          <label className="block text-xs font-bold mb-1">Nueva contraseña</label>
          <input name="contraseña" type="password" value={form.contraseña} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Nueva contraseña" />
        </div>
        <div className="mb-4">
          <label className="block text-xs font-bold mb-1">Confirmar contraseña</label>
          <input name="confirmar" type="password" value={form.confirmar} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Confirmar contraseña" />
        </div>
        {msg && <div className={`mb-4 text-sm ${msg.includes('correcta') ? 'text-green-600' : 'text-red-600'}`}>{msg}</div>}
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" disabled={loading}>
          {loading ? 'Guardando...' : 'Actualizar contraseña'}
        </button>
      </form>
    </div>
  );
};

export default PerfilAdmin;
