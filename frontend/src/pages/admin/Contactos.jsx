import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/common/AuthContext';
import { getEmpresa, updateEmpresa } from '../../services/empresaService';

const initialData = {
  nombre: '',
  telefono: '',
  correo: '',
  direccion: '',
  mensaje: '',
};

const Contactos = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.rol === 'superadmin';
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setLoading(true);
    getEmpresa()
      .then(data => {
        setForm(data);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar los datos de la empresa');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
    setSuccess(null);
    setError(null);
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    try {
      await updateEmpresa(form);
      setEditMode(false);
      setSuccess('Datos actualizados correctamente');
    } catch (err) {
      setError('No se pudo actualizar la información');
    }
  };

  if (loading) return <div className="text-center py-8">Cargando datos...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Datos de la Empresa</h1>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-4 text-center">{success}</div>}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          <div className="flex flex-col">
            <label className="font-semibold flex items-center gap-2"><span className="material-icons text-base"></span>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              disabled={!editMode}
              className="input input-bordered mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold flex items-center gap-2"><span className="material-icons text-base"></span>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              disabled={!editMode}
              className="input input-bordered mt-1"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold flex items-center gap-2"><span className="material-icons text-base"></span>Correo</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              disabled={!editMode}
              className="input input-bordered mt-1"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold flex items-center gap-2"><span className="material-icons text-base"></span>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              disabled={!editMode}
              className="input input-bordered mt-1"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold flex items-center gap-2"><span className="material-icons text-base"></span>Mensaje</label>
            <input
              type="text"
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              disabled={!editMode}
              className="input input-bordered mt-1"
            />
          </div>
        </form>
        <div className="flex justify-end mt-8">
          {isSuperAdmin && (
            editMode ? (
              <button
                type="button"
                onClick={handleSave}
                className="btn btn-primary px-6"
              >
                Guardar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="btn btn-outline-primary px-6"
              >
                Modificar
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Contactos;
