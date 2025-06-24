import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/common/AuthContext';
import { Navigate } from 'react-router-dom';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario, getUsuarioById } from '../../services/usuarioService';

const columns = [
  { label: 'Id', key: '_id' },
  { label: 'Nombre', key: 'nombre' },
  { label: 'Correo', key: 'correo' },
  { label: 'Teléfono', key: 'telefono' },
  { label: 'Dirección', key: 'direccion' },
  { label: 'Editar', key: 'edit', isAction: true },
  { label: 'Eliminar', key: 'delete', isAction: true },
];

const initialForm = {
  nombre: '',
  correo: '',
  telefono: '',
  direccion: '',
  password: '',
  confirmar: '',
};

const Modal = ({ open, onClose, onSubmit, initialData, isEdit }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          nombre: initialData.nombre || '',
          correo: initialData.correo || '',
          telefono: initialData.telefono || '',
          direccion: initialData.direccion || '',
          password: '',
          confirmar: '',
        });
      } else {
        setForm(initialForm);
      }
      setError('');
    }
  }, [open, initialData]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateEmail(form.correo)) {
      setError('Correo electrónico no válido');
      return;
    }
    if (!isEdit && form.password !== form.confirmar) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setError('');
    onSubmit(form);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h2 className="text-lg font-bold mb-6">{isEdit ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
        {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold mb-1">Nombre</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Nombre del cliente" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Correo</label>
              <input name="correo" value={form.correo} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Correo electrónico" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Teléfono</label>
              <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Teléfono" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Dirección</label>
              <input name="direccion" value={form.direccion} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Dirección" />
            </div>
            {!isEdit && (
              <>
                <div>
                  <label className="block text-xs font-bold mb-1">Contraseña</label>
                  <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Contraseña" required />
                  <span className="text-xs text-gray-500 block">Mínimo 6 caracteres</span>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Confirmar Contraseña</label>
                  <input name="confirmar" type="password" value={form.confirmar} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Confirmar contraseña" required />
                  <span className="text-xs text-gray-500 block">Debe coincidir con la contraseña</span>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">{isEdit ? 'Guardar Cambios' : 'Registrar'}</button>
            <button type="button" className="bg-gray-200 px-6 py-2 rounded" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Clientes = () => {
  const { user } = useAuth();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  if (!user) return <Navigate to="/admin/login" />;
  if (user.rol !== 'admin' && user.rol !== 'superadmin') {
    setTimeout(() => setRedirect(true), 2000);
    return redirect ? <Navigate to="/admin" /> : <div>No autorizado. Redirigiendo al dashboard...</div>;
  }

  useEffect(() => {
    setLoading(true);
    getUsuarios()
      .then(data => setClientes(data.filter(u => u.rol === 'cliente')))
      .catch(() => setClientes([]))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 2500);
  };

  const handleRegister = async (form) => {
    try {
      let dataToSend = { ...form, rol: 'cliente' };
      if (isEdit) {
        if (!form.password && !form.confirmar) {
          delete dataToSend.password;
          delete dataToSend.confirmar;
        } else if (form.password !== form.confirmar) {
          showToast('Las contraseñas no coinciden', 'error');
          return;
        }
      }
      if (isEdit && editData) {
        await updateUsuario(editData._id, dataToSend);
        showToast('Cliente actualizado correctamente', 'success');
      } else {
        await createUsuario(dataToSend);
        showToast('Cliente creado correctamente', 'success');
      }
      setModalOpen(false);
      setEditData(null);
      setIsEdit(false);
      setLoading(true);
      const data = await getUsuarios();
      setClientes(data.filter(u => u.rol === 'cliente'));
    } catch (err) {
      showToast('Error al guardar cliente', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = async (cliente) => {
    try {
      const freshCliente = await getUsuarioById(cliente._id);
      setEditData(freshCliente);
      setIsEdit(true);
      setModalOpen(true);
    } catch (err) {
      showToast('No se pudo obtener el cliente actualizado', 'error');
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditData(null);
    setIsEdit(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUsuario(deleteId);
      setClientes(clientes.filter(u => u._id !== deleteId));
      showToast('Cliente eliminado correctamente', 'success');
    } catch (err) {
      showToast('Error al eliminar cliente', 'error');
    } finally {
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="p-6">
      {toast.show && (
        <div className={`fixed top-6 right-6 z-[100] px-6 py-3 rounded shadow-lg text-white font-semibold transition-all ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>entries</span>
        </div>
        <button onClick={() => { setModalOpen(true); setIsEdit(false); setEditData(null); }} className="border border-black rounded p-2 hover:bg-black hover:text-white transition-colors text-xl font-bold">+</button>
        <div>
          <label className="mr-2">Search:</label>
          <input className="border rounded px-2 py-1 text-sm" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b font-semibold text-left whitespace-nowrap">Id</th>
              <th className="px-4 py-2 border-b font-semibold text-left whitespace-nowrap">Nombre</th>
              <th className="px-4 py-2 border-b font-semibold text-left whitespace-nowrap">Correo</th>
              <th className="px-4 py-2 border-b font-semibold text-left whitespace-nowrap">Teléfono</th>
              <th className="px-4 py-2 border-b font-semibold text-left whitespace-nowrap">Dirección</th>
              {columns.filter(col => col.isAction).map(col => (
                <th key={col.key} className="px-4 py-2 border-b font-semibold text-left whitespace-nowrap">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5 + columns.filter(col => col.isAction).length} className="text-center py-6">Loading...</td>
              </tr>
            ) : clientes.length === 0 ? (
              <tr>
                <td colSpan={5 + columns.filter(col => col.isAction).length} className="text-center py-6">No hay clientes</td>
              </tr>
            ) : (
              clientes.map(cliente => (
                <tr key={cliente._id}>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{cliente._id}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{cliente.nombre}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{cliente.correo}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{cliente.telefono}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{cliente.direccion}</td>
                  {columns.filter(col => col.isAction).map(col => {
                    if (col.key === 'edit') {
                      return (
                        <td key="edit" className="px-4 py-2 border-b text-center">
                          <button className="text-blue-600 hover:text-blue-800 p-1" title="Editar" onClick={() => handleEditClick(cliente)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z" /></svg>
                          </button>
                        </td>
                      );
                    }
                    if (col.key === 'delete') {
                      return (
                        <td key="delete" className="px-4 py-2 border-b text-center">
                          <button className="text-red-600 hover:text-red-800 p-1" title="Eliminar" onClick={() => handleDeleteClick(cliente._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </td>
                      );
                    }
                    return null;
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal para crear/editar cliente */}
      <Modal open={modalOpen} onClose={handleModalClose} onSubmit={handleRegister} initialData={editData} isEdit={isEdit} />
      {/* Confirmación de borrado */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-lg font-bold mb-4">¿Seguro que deseas eliminar este cliente?</h2>
            <div className="flex justify-end gap-2">
              <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600" onClick={handleDeleteConfirm}>Eliminar</button>
              <button className="bg-gray-200 px-6 py-2 rounded" onClick={handleDeleteCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
