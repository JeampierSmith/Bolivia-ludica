import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/common/AuthContext';
import { Navigate } from 'react-router-dom';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario, getUsuarioById } from '../../services/usuarioService';

const columns = [
  { label: 'Id', key: '_id' },
  { label: 'Nombre', key: 'nombre' },
  { label: 'Correo', key: 'correo' },
  { label: 'Rol', key: 'rol' },
  { label: 'Editar', key: 'edit', isAction: true },
  { label: 'Eliminar', key: 'delete', isAction: true },
];

const initialForm = {
  nombre: '',
  correo: '',
  telefono: '',
  contraseña: '',
  confirmar: '',
  rol: 'admin'
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
          contraseña: '',
          confirmar: '',
          rol: initialData.rol || 'admin'
        });
      } else {
        setForm(initialForm);
      }
      setError('');
    }
  }, [open, initialData]);

  const validateEmail = (email) => {
    // Simple regex for email validation
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
    if (!isEdit && form.contraseña !== form.confirmar) {
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
        <h2 className="text-lg font-bold mb-6">{isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
        {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold mb-1">Nombre</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Nombre del usuario" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Correo</label>
              <input name="correo" value={form.correo} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Correo electrónico" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Telefono</label>
              <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Telefono" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Contraseña</label>
              <input name="contraseña" type="password" value={form.contraseña} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Contraseña" required={!isEdit} />
              {isEdit && <span className="text-xs text-gray-500 block">Deja en blanco para no cambiar la contraseña</span>}
              {!isEdit && <span className="text-xs text-gray-500 block">Mínimo 6 caracteres</span>}
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Confirmar Contraseña</label>
              <input name="confirmar" type="password" value={form.confirmar} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Confirmar contraseña" required={!isEdit} />
              <span className="text-xs text-gray-500 block">Debe coincidir con la contraseña</span>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Rol</label>
              <select name="rol" value={form.rol} onChange={handleChange} className="w-full border rounded px-2 py-1">
                <option value="admin">Administrador</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
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

const Usuarios = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/admin/login" replace />;
  if (user.rol !== 'superadmin') return <Navigate to="/" replace />;


  // --- PAGINACIÓN Y BUSQUEDA ---
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    setLoading(true);
    getUsuarios()
      .then(data => setUsuarios(data.filter(u => u.rol === 'admin' || u.rol === 'superadmin')))
      .catch(() => setUsuarios([]))
      .finally(() => setLoading(false));
  }, []);

  // --- FILTRADO Y PAGINACIÓN ---
  const filteredUsuarios = usuarios.filter(u => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      (u.nombre || "").toLowerCase().includes(term) ||
      (u.correo || "").toLowerCase().includes(term) ||
      (u.rol || "").toLowerCase().includes(term)
    );
  });
  const totalEntries = filteredUsuarios.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalEntries);
  const currentUsuarios = filteredUsuarios.slice(startIdx, endIdx);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 2500);
  };

  const handleRegister = async (form) => {
    try {
      let dataToSend = { ...form };
      // Si es edición y los campos de contraseña están vacíos, no los envíes
      if (isEdit) {
        if (!form.contraseña && !form.confirmar) {
          delete dataToSend.contraseña;
          delete dataToSend.confirmar;
        } else if (form.contraseña !== form.confirmar) {
          showToast('Las contraseñas no coinciden', 'error');
          return;
        }
      }
      if (isEdit && editData) {
        await updateUsuario(editData._id, dataToSend);
        showToast('Usuario actualizado correctamente', 'success');
      } else {
        await createUsuario(dataToSend);
        showToast('Usuario creado correctamente', 'success');
      }
      setModalOpen(false);
      setEditData(null);
      setIsEdit(false);
      setLoading(true);
      const data = await getUsuarios();
      setUsuarios(data.filter(u => u.rol === 'admin' || u.rol === 'superadmin'));
    } catch (err) {
      showToast('Error al guardar usuario', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = async (usuario) => {
    try {
      const freshUser = await getUsuarioById(usuario._id);
      setEditData(freshUser);
      setIsEdit(true);
      setModalOpen(true);
    } catch (err) {
      showToast('No se pudo obtener el usuario actualizado', 'error');
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
      setUsuarios(usuarios.filter(u => u._id !== deleteId));
      showToast('Usuario eliminado correctamente', 'success');
    } catch (err) {
      showToast('Error al eliminar usuario', 'error');
    } finally {
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };
  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));
  const handleSearchChange = e => {
    setSearch(e.target.value);
    setPage(1);
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
          <select className="border rounded px-2 py-1 text-sm" value={pageSize} onChange={handlePageSizeChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>entries</span>
        </div>
        <button onClick={() => { setModalOpen(true); setIsEdit(false); setEditData(null); }} className="border border-black rounded p-2 hover:bg-black hover:text-white transition-colors text-xl font-bold">+</button>
        <div>
          <label className="mr-2">Search:</label>
          <input className="border rounded px-2 py-1 text-sm" value={search} onChange={handleSearchChange} placeholder="Buscar usuario..." />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              {columns.map(col => (
                (col.key === 'rol' && user.rol !== 'superadmin') ? null : (
                  <th key={col.key} className="px-4 py-2 border-b font-semibold text-left whitespace-nowrap">{col.label}</th>
                )
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">Loading...</td>
              </tr>
            ) : currentUsuarios.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">No hay usuarios</td>
              </tr>
            ) : (
              currentUsuarios.map(usuario => (
                <tr key={usuario._id}>
                  {columns.map(col => {
                    if (col.isAction && col.key === 'edit') {
                      return (
                        <td key="edit" className="px-4 py-2 border-b text-center">
                          <button className="text-blue-600 hover:text-blue-800 p-1" title="Editar" onClick={() => handleEditClick(usuario)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z" /></svg>
                          </button>
                        </td>
                      );
                    }
                    if (col.isAction && col.key === 'delete') {
                      return (
                        <td key="delete" className="px-4 py-2 border-b text-center">
                          <button className="text-red-600 hover:text-red-800 p-1" title="Eliminar" onClick={() => handleDeleteClick(usuario._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </td>
                      );
                    }
                    if (col.key === 'rol' && user.rol === 'superadmin') {
                      return (
                        <td key="rol" className="px-4 py-2 border-b whitespace-nowrap">
                          {usuario.rol}
                        </td>
                      );
                    }
                    if (col.key === 'rol') return null;
                    return (
                      <td key={col.key} className="px-4 py-2 border-b whitespace-nowrap">{usuario[col.key]}</td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs">
            {totalEntries === 0
              ? 'Showing 0 to 0 of 0 entries'
              : `Showing ${startIdx + 1} to ${endIdx} of ${totalEntries} entries`}
          </span>
          <div>
            <button className="border rounded px-3 py-1 mr-2 text-xs" onClick={handlePrev} disabled={page === 1}>Previous</button>
            <button className="border rounded px-3 py-1 text-xs" onClick={handleNext} disabled={page === totalPages || totalEntries === 0}>Next</button>
          </div>
        </div>
      </div>
      {/* Modal para crear/editar usuario */}
      <Modal open={modalOpen} onClose={handleModalClose} onSubmit={handleRegister} initialData={editData} isEdit={isEdit} />
      {/* Confirmación de borrado */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-lg font-bold mb-4">¿Seguro que deseas eliminar este usuario?</h2>
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

export default Usuarios;
