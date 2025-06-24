import React, { useEffect, useState } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../../services/productoService';
import { getToken } from '../../utils/auth';

const API_URL = import.meta.env.VITE_API_URL;
const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL;

const columns = [
  { label: 'Id', key: '_id' },
  { label: 'Imagen', key: 'imagenes', isImage: true },
  { label: 'Nombre', key: 'nombre' },
  { label: 'Descripción', key: 'descripcion' },
  { label: 'Precio', key: 'precio' },
  { label: 'Stock', key: 'stock' },
  { label: 'Categoría', key: 'categoria' },
  { label: 'Editar', key: 'edit', isAction: true },
  { label: 'Eliminar', key: 'delete', isAction: true },
];

const initialForm = {
  nombre: '',
  descripcion: '',
  precio: '',
  imagenes: '',
  stock: '',
  categoria: 'Otros',
};

const Modal = ({ open, onClose, onSubmit, initialData, isEdit }) => {
  const [form, setForm] = useState(initialForm);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          ...initialData,
          imagenes: Array.isArray(initialData.imagenes) ? (initialData.imagenes[0] || '') : (initialData.imagenes || '')
        });
        setImageUrl(Array.isArray(initialData.imagenes) ? (initialData.imagenes[0] || '') : (initialData.imagenes || ''));
      } else {
        setForm(initialForm);
        setImageUrl('');
      }
    }
  }, [open, initialData]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    setUploading(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/upload/producto`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: data,
      });
      const result = await res.json();
      setImageUrl(result.url);
      setForm(f => ({ ...f, imagenes: result.url }));
    } catch (err) {
      alert('Error subiendo la imagen');
    }
    setUploading(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Asegura que precio y stock sean números
    const parsedForm = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock)
    };
    onSubmit(parsedForm);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h2 className="text-lg font-bold mb-6">{isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold mb-1">Nombre</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Nombre del producto" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Descripción</label>
              <input name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Descripción" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Precio</label>
              <input name="precio" type="number" value={form.precio} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Precio" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Stock</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Stock" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold mb-1">Imagen</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border rounded px-2 py-1" />
              {uploading && <span className="text-xs text-blue-600">Subiendo imagen...</span>}
              {imageUrl && (
                <img src={imageUrl.startsWith('/uploads') ? UPLOADS_URL + imageUrl : imageUrl} alt="preview" className="mt-2 h-20" />
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold mb-1">Categoría</label>
              <select name="categoria" value={form.categoria} onChange={handleChange} className="w-full border rounded px-2 py-1">
                <option value="Juegos de Mesa">Juegos de Mesa</option>
                <option value="Cartas TCG">Cartas TCG</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Ropa">Ropa</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
              {isEdit ? 'Guardar Cambios' : 'Registrar'}
            </button>
            <button type="button" className="bg-gray-200 px-6 py-2 rounded" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    setLoading(true);
    getProductos()
      .then(data => setProductos(data))
      .catch(() => setProductos([]))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 2500);
  };

  const handleRegister = async (form) => {
    // Asegura que imagenes sea siempre un array
    const formData = { ...form, imagenes: form.imagenes ? [form.imagenes] : [] };
    try {
      if (isEdit && editData) {
        await updateProducto(editData._id, formData);
        showToast('Producto actualizado correctamente', 'success');
      } else {
        await createProducto(formData);
        showToast('Producto creado correctamente', 'success');
      }
      setModalOpen(false);
      setEditData(null);
      setIsEdit(false);
      setLoading(true);
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      // Muestra el mensaje de error del backend si existe
      let msg = isEdit ? 'Error al actualizar producto' : 'Error al crear producto';
      if (err && err.message) msg += ': ' + err.message;
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (producto) => {
    setEditData(producto);
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
      await deleteProducto(deleteId);
      setProductos(productos.filter(p => p._id !== deleteId));
      showToast('Producto eliminado correctamente', 'success');
    } catch (err) {
      showToast('Error al eliminar producto', 'error');
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
      {!loading && productos.length === 0 && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 text-center font-semibold">No se encontraron productos en la base de datos.</div>
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
        <button onClick={() => setModalOpen(true)} className="border border-black rounded p-2 hover:bg-black hover:text-white transition-colors text-xl font-bold">+</button>
        <div>
          <label className="mr-2">Search:</label>
          <input className="border rounded px-2 py-1 text-sm" />
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
            ) : productos.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">No hay productos</td>
              </tr>
            ) : (
              productos.map(producto => (
                <tr key={producto._id}>
                  {columns.map(col => {
                    if (col.isAction && col.key === 'edit') {
                      return (
                        <td key="edit" className="px-4 py-2 border-b text-center">
                          <button
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Editar"
                            onClick={() => handleEditClick(producto)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z" /></svg>
                          </button>
                        </td>
                      );
                    }
                    if (col.isAction && col.key === 'delete') {
                      return (
                        <td key="delete" className="px-4 py-2 border-b text-center">
                          <button
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Eliminar"
                            onClick={() => handleDeleteClick(producto._id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </td>
                      );
                    }
                    if (col.isImage) {
                      // Muestra la primera imagen si existe
                      return (
                        <td key="imagenes" className="px-4 py-2 border-b text-center">
                          {producto.imagenes && producto.imagenes.length > 0 ? (
                            <img src={(producto.imagenes[0]?.startsWith('/uploads') ? UPLOADS_URL + producto.imagenes[0] : producto.imagenes[0])} alt="img" className="h-12 mx-auto rounded shadow" />
                          ) : (
                            <span className="text-gray-400">Sin imagen</span>
                          )}
                        </td>
                      );
                    }
                    return (
                      <td key={col.key} className="px-4 py-2 border-b whitespace-nowrap">{producto[col.key]}</td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs">Showing 0 to 0 of 0 entries</span>
          <div>
            <button className="border rounded px-3 py-1 mr-2 text-xs">Previous</button>
            <button className="border rounded px-3 py-1 text-xs">Next</button>
          </div>
        </div>
      </div>
      <Modal open={modalOpen} onClose={handleModalClose} onSubmit={handleRegister} initialData={editData} isEdit={isEdit} />
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">¿Eliminar producto?</h2>
            <p className="mb-6">¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.</p>
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

export default Productos;
