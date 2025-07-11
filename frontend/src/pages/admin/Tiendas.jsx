import React, { useEffect, useState } from 'react';
import { getTiendas, createTienda, updateTienda, deleteTienda } from '../../services/tiendaService';
import { getDepartamentos, createDepartamento } from '../../services/departamentoService';

const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL;

const DEPARTAMENTOS = [
  'Cochabamba',
  'La Paz',
  'Oruro',
  'Potosí',
  'Santa Cruz',
  'Sucre',
  'Tarija',
  'Otro...'
];

const columns = [
  { label: 'Id', key: '_id' },
  { label: 'Nombre', key: 'nombre' },
  { label: 'Ubicación', key: 'ubicacion' },
  { label: 'Dirección', key: 'direccion' },
  { label: 'Teléfono', key: 'telefono' },
  { label: 'Correo', key: 'correo' },
  { label: 'Logo', key: 'logo' },
  { label: 'Editar', key: 'edit', isAction: true },
  { label: 'Eliminar', key: 'delete', isAction: true },
];

const initialForm = {
  nombre: '',
  ubicacion: '',
  logo: '',
  descripcion: '',
  direccion: '',
  ambiente: [],
  telefono: '',
  correo: '',
  horarios: '',
  tiktok: '',
  facebook: '',
  instagram: '',
};

const Modal = ({ open, onClose, onSubmit, initialData, isEdit, departamentos, onAddDepartamento }) => {
  const [form, setForm] = useState(initialForm);
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [ambienteImgs, setAmbienteImgs] = useState([]);
  const [ambienteUploading, setAmbienteUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [customDepto, setCustomDepto] = useState('');
  const [showDeptoInput, setShowDeptoInput] = useState(false);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          ...initialForm,
          ...initialData,
          ambiente: Array.isArray(initialData.ambiente) ? initialData.ambiente : [],
        });
        setLogoUrl(initialData.logo || '');
        setAmbienteImgs(Array.isArray(initialData.ambiente) ? initialData.ambiente : []);
        const isCustom = initialData.ubicacion && !departamentos.map(d=>d.nombre).includes(initialData.ubicacion);
        setCustomDepto(isCustom ? initialData.ubicacion : '');
        setShowDeptoInput(isCustom);
      } else {
        setForm(initialForm);
        setLogoUrl('');
        setAmbienteImgs([]);
        setCustomDepto('');
        setShowDeptoInput(false);
      }
      setErrors({});
    }
  }, [open, initialData, departamentos]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value ?? '' }));
  };

  const handleDeptoChange = e => {
    const value = e.target.value;
    if (value === 'nuevo') {
      setForm(f => ({ ...f, ubicacion: '' }));
      setCustomDepto('');
      setShowDeptoInput(true);
    } else {
      setForm(f => ({ ...f, ubicacion: value }));
      setCustomDepto('');
      setShowDeptoInput(false);
    }
  };

  const isValidUrl = url => {
    try {
      if (!url) return true;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    // Si es edición, envía el tiendaId para que el backend elimine el logo anterior
    if (isEdit && initialData && initialData._id) {
      data.append('tiendaId', initialData._id);
    }
    setUploading(true);
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/upload/tienda', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      setLogoUrl(result.url);
      setForm(f => ({ ...f, logo: result.url }));
    } catch (err) {
      alert('Error subiendo el logo');
    }
    setUploading(false);
  };

  const handleAmbienteChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setAmbienteUploading(true);
    const newImgs = [];
    for (const file of files) {
      const data = new FormData();
      data.append('file', file);
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + '/upload/tienda', {
          method: 'POST',
          body: data,
        });
        const result = await res.json();
        if (result.url) newImgs.push(result.url);
      } catch (err) {
        // Puedes mostrar un error si lo deseas
      }
    }
    // Reemplaza todas las imágenes de ambiente anteriores por las nuevas
    setAmbienteImgs(newImgs);
    setForm(f => ({ ...f, ambiente: newImgs }));
    setAmbienteUploading(false);
  };

  const handleRemoveAmbienteImg = (img) => {
    setAmbienteImgs(imgs => imgs.filter(i => i !== img));
    setForm(f => ({ ...f, ambiente: (f.ambiente || []).filter(i => i !== img) }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    ['facebook', 'instagram', 'tiktok'].forEach(field => {
      if (form[field] && !isValidUrl(form[field])) {
        newErrors[field] = 'Debe ser una URL válida';
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    onSubmit(form);
  };

  const handleAddDepto = async () => {
    if (!customDepto.trim()) return;
    try {
      const nuevo = await onAddDepartamento(customDepto.trim());
      setForm(f => ({ ...f, ubicacion: nuevo.nombre }));
      setShowDeptoInput(false);
    } catch (err) {
      alert('Error al crear departamento');
    }
  };

  // Mejor UX/UI para el formulario
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl">×</button>
        <h2 className="text-lg font-bold mb-4 text-center">{isEdit ? 'Editar Tienda' : 'Nueva Tienda'}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">Nombre</label>
              <input name="nombre" value={form.nombre || ''} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Nombre de la tienda" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Ubicación</label>
              <select
                name="ubicacion"
                value={showDeptoInput ? 'nuevo' : (departamentos.map(d=>d.nombre).includes(form.ubicacion) ? form.ubicacion : '')}
                onChange={handleDeptoChange}
                className="w-full border rounded px-2 py-1"
                required
              >
                <option value="" disabled>Selecciona un departamento</option>
                {departamentos.map(dep => <option key={dep._id} value={dep.nombre}>{dep.nombre}</option>)}
                <option value="nuevo">Agregar nuevo departamento...</option>
              </select>
              {showDeptoInput && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    placeholder="Nuevo departamento"
                    value={customDepto}
                    onChange={e => setCustomDepto(e.target.value)}
                    required
                  />
                  <button type="button" className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleAddDepto}>Agregar</button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Dirección</label>
              <input name="direccion" value={form.direccion || ''} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Dirección exacta" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Teléfono</label>
              <input name="telefono" value={form.telefono || ''} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Teléfono" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Correo</label>
              <input name="correo" value={form.correo || ''} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Correo electrónico" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Horarios</label>
              <input name="horarios" value={form.horarios || ''} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Ej: Lun-Vie 9:00-18:00" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Logo</label>
            <div className="flex items-center gap-3">
              <input type="file" accept="image/*" onChange={handleFileChange} className="border rounded px-2 py-1 w-full" />
              {uploading && <span className="text-xs text-blue-600">Subiendo...</span>}
            </div>
            {logoUrl && (
              <div className="flex justify-center mt-2">
                <img src={logoUrl.startsWith('/uploads') ? UPLOADS_URL + logoUrl : logoUrl} alt="preview" className="h-20 rounded shadow border" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Imágenes del ambiente</label>
            <input type="file" accept="image/*" multiple onChange={handleAmbienteChange} className="border rounded px-2 py-1 w-full" />
            {ambienteUploading && <span className="text-xs text-blue-600 ml-2">Subiendo imágenes...</span>}
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {ambienteImgs.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img.startsWith('/uploads') ? UPLOADS_URL + img : img} alt="ambiente" className="h-14 w-14 object-cover rounded border" />
                  <button type="button" onClick={() => handleRemoveAmbienteImg(img)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100">×</button>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">Facebook</label>
              <input name="facebook" value={form.facebook || ''} onChange={handleChange} className={`w-full border rounded px-2 py-1 ${errors.facebook ? 'border-red-500' : ''}`} placeholder="https://facebook.com/tu-pagina" />
              {errors.facebook && <span className="text-xs text-red-600">{errors.facebook}</span>}
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Instagram</label>
              <input name="instagram" value={form.instagram || ''} onChange={handleChange} className={`w-full border rounded px-2 py-1 ${errors.instagram ? 'border-red-500' : ''}`} placeholder="https://instagram.com/tu-usuario" />
              {errors.instagram && <span className="text-xs text-red-600">{errors.instagram}</span>}
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">TikTok</label>
              <input name="tiktok" value={form.tiktok || ''} onChange={handleChange} className={`w-full border rounded px-2 py-1 ${errors.tiktok ? 'border-red-500' : ''}`} placeholder="https://tiktok.com/@tu-usuario" />
              {errors.tiktok && <span className="text-xs text-red-600">{errors.tiktok}</span>}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Descripción</label>
            <textarea name="descripcion" value={form.descripcion || ''} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Descripción" />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">{isEdit ? 'Guardar Cambios' : 'Registrar'}</button>
            <button type="button" className="bg-gray-200 px-6 py-2 rounded" onClick={onClose}>Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Tiendas = () => {
  const [tiendas, setTiendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [departamentos, setDepartamentos] = useState([]);
  // --- PAGINACIÓN ---
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // --- BUSCADOR ---
  const [search, setSearch] = useState("");

  // Filtrado por búsqueda antes de paginar
  const filteredTiendas = tiendas.filter(t => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      (t.nombre || "").toLowerCase().includes(term) ||
      (t.ubicacion || "").toLowerCase().includes(term) ||
      (t.direccion || "").toLowerCase().includes(term) ||
      (t.telefono || "").toLowerCase().includes(term) ||
      (t.correo || "").toLowerCase().includes(term)
    );
  });
  const totalEntries = filteredTiendas.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalEntries);
  const currentTiendas = filteredTiendas.slice(startIdx, endIdx);

  const fetchTiendas = async () => {
    setLoading(true);
    try {
      const data = await getTiendas();
      setTiendas(data);
    } catch {
      setTiendas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiendas();
    getDepartamentos().then(setDepartamentos).catch(() => setDepartamentos([]));
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 2500);
  };

  // --- MODIFICACIÓN PARA REGISTRO ROBUSTO DE TIENDAS ---
  // Asegura que el registro y edición de tiendas maneje correctamente logo, ambiente y redes sociales
  const handleRegister = async (form) => {
    // Normaliza campos para el backend
    const formData = {
      ...form,
      ambiente: Array.isArray(form.ambiente) ? form.ambiente : (form.ambiente ? [form.ambiente] : []),
      // Agrupa redes sociales en un objeto si es necesario
      redesSociales: {
        facebook: form.facebook || '',
        instagram: form.instagram || ''
      },
    };
    // Elimina campos planos de redes sociales para evitar duplicidad
    delete formData.facebook;
    delete formData.instagram;
    try {
      if (isEdit && editData) {
        await updateTienda(editData._id, formData);
        showToast('Tienda actualizada correctamente', 'success');
      } else {
        await createTienda(formData);
        showToast('Tienda creada correctamente', 'success');
      }
      setModalOpen(false);
      setEditData(null);
      setIsEdit(false);
      fetchTiendas();
    } catch (err) {
      let msg = isEdit ? 'Error al actualizar tienda' : 'Error al crear tienda';
      if (err && err.message) msg += ': ' + err.message;
      showToast(msg, 'error');
    }
  };

  const handleEditClick = (tienda) => {
    setEditData(tienda);
    setIsEdit(true);
    setModalOpen(true);
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
      await deleteTienda(deleteId);
      setTiendas(tiendas.filter(t => t._id !== deleteId));
      showToast('Tienda eliminada correctamente', 'success');
    } catch (err) {
      showToast('Error al eliminar tienda', 'error');
    } finally {
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  // --- MODIFICACIÓN PARA PAGINACIÓN Y ENTRIES ---
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
        <div className={`fixed top-6 right-6 z-[100] px-6 py-3 rounded shadow-lg text-white font-semibold transition-all ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{toast.message}</div>
      )}
      {!loading && tiendas.length === 0 && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 text-center font-semibold">No se encontraron tiendas en la base de datos.</div>
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
        <button onClick={() => { setModalOpen(true); setEditData(null); setIsEdit(false); }} className="border border-black rounded p-2 hover:bg-black hover:text-white transition-colors text-xl font-bold">+</button>
        <div>
          <label className="mr-2">Search:</label>
          <input className="border rounded px-2 py-1 text-sm" value={search} onChange={handleSearchChange} placeholder="Buscar tienda..." />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className="px-4 py-2 border-b font-semibold text-left whitespace-nowrap">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">Loading...</td>
              </tr>
            ) : currentTiendas.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">No hay tiendas</td>
              </tr>
            ) : (
              currentTiendas.map(tienda => (
                <tr key={tienda._id}>
                  {columns.map(col => {
                    if (col.isAction && col.key === 'edit') {
                      return (
                        <td key="edit" className="px-4 py-2 border-b text-center">
                          <button className="text-blue-600 hover:text-blue-800 p-1" title="Editar" onClick={() => handleEditClick(tienda)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z" /></svg>
                          </button>
                        </td>
                      );
                    }
                    if (col.isAction && col.key === 'delete') {
                      return (
                        <td key="delete" className="px-4 py-2 border-b text-center">
                          <button className="text-red-600 hover:text-red-800 p-1" title="Eliminar" onClick={() => handleDeleteClick(tienda._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </td>
                      );
                    }
                    if (col.key === 'logo') {
                      return (
                        <td key="logo" className="px-4 py-2 border-b whitespace-nowrap">
                          {tienda.logo ? <img src={tienda.logo.startsWith('/uploads') ? UPLOADS_URL + tienda.logo : tienda.logo} alt="logo" className="h-8" /> : ''}
                        </td>
                      );
                    }
                    if (col.key === 'ambiente') {
                      return (
                        <td key="ambiente" className="px-4 py-2 border-b whitespace-nowrap">
                          {Array.isArray(tienda.ambiente) && tienda.ambiente.length > 0 ? (
                            <div className="flex gap-1 flex-wrap">
                              {tienda.ambiente.map((img, i) => (
                                <img key={i} src={img.startsWith('/uploads') ? UPLOADS_URL + img : img} alt="amb" className="h-8 w-8 object-cover rounded" />
                              ))}
                            </div>
                          ) : ''}
                        </td>
                      );
                    }
                    if (["facebook","instagram","tiktok"].includes(col.key)) {
                      const url = tienda[col.key];
                      return (
                        <td key={col.key} className="px-4 py-2 border-b whitespace-nowrap">
                          {url ? <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{col.key.charAt(0).toUpperCase() + col.key.slice(1)}</a> : ''}
                        </td>
                      );
                    }
                    return (
                      <td key={col.key} className="px-4 py-2 border-b whitespace-nowrap">{tienda[col.key]}</td>
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
      <Modal open={modalOpen} onClose={handleModalClose} onSubmit={handleRegister} initialData={editData} isEdit={isEdit} departamentos={departamentos} onAddDepartamento={async (nombre) => {
        const nuevo = await createDepartamento(nombre);
        setDepartamentos(deps => [...deps, nuevo]);
        return nuevo;
      }} />
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">¿Eliminar tienda?</h2>
            <p className="mb-6">¿Estás seguro de que deseas eliminar esta tienda? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <button onClick={handleDeleteCancel} className="bg-gray-200 px-6 py-2 rounded">No</button>
              <button onClick={handleDeleteConfirm} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-2">
            <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-blue-600 font-semibold">Cargando...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tiendas;
