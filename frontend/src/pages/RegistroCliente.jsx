import React, { useState } from 'react';
import { createUsuario } from '../../services/usuarioService';

const initialForm = {
  nombre: '',
  correo: '',
  telefono: '',
  direccion: '',
  password: '',
};

const RegistroCliente = () => {
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async e => {
    e.preventDefault();
    setFormError('');
    setSuccessMsg('');
    try {
      await createUsuario({ ...form, rol: 'cliente' });
      setSuccessMsg('¡Registro exitoso! Ya puedes iniciar sesión.');
      setForm(initialForm);
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro de Cliente</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-xs font-bold mb-1">Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold mb-1">Correo</label>
            <input name="correo" type="email" value={form.correo} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold mb-1">Teléfono</label>
            <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold mb-1">Dirección</label>
            <input name="direccion" value={form.direccion} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold mb-1">Contraseña</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
          </div>
          {formError && <div className="text-red-600 mb-2">{formError}</div>}
          {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}
          <div className="flex justify-end gap-2">
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroCliente;
