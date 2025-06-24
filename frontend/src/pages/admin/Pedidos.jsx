import React, { useEffect, useState } from 'react';
import { getPedidos, createPedido, updatePedido, deletePedido } from '../../services/pedidoService';
import { getProductos } from '../../services/productoService';
import { getUsuarios } from '../../services/usuarioService';

const columns = [
  { label: 'Id', key: '_id' },
  { label: 'Usuario', key: 'usuario' },
  { label: 'Productos', key: 'productos' },
  { label: 'Total', key: 'total' },
  { label: 'Estado', key: 'estado' },
  { label: 'Dirección', key: 'direccionEntrega' },
  { label: 'Fecha', key: 'fechaPedido' },
  { label: 'Editar', key: 'edit', isAction: true },
  { label: 'Eliminar', key: 'delete', isAction: true },
];

const estados = [
  'pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'
];

const initialForm = {
  usuario: '',
  productos: [], // [{ producto: id, cantidad: n }]
  estado: 'pendiente',
  direccionEntrega: '',
};

const Modal = ({ open, onClose, onSubmit, initialData, isEdit }) => {
  const [form, setForm] = useState(initialForm);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (open) {
      setForm(initialForm);
      setTotal(0);
      if (isEdit && initialData) {
        setForm({
          usuario: initialData.usuario?._id || initialData.usuario,
          productos: initialData.productos.map(p => ({ producto: p.producto._id || p.producto, cantidad: p.cantidad })),
          estado: initialData.estado,
          direccionEntrega: initialData.direccionEntrega,
        });
      }
      getProductos().then(setProductosDisponibles);
      getUsuarios().then(users => setClientes(users.filter(u => u.rol === 'cliente')));
    }
  }, [open, isEdit, initialData]);

  useEffect(() => {
    // Calcular total automáticamente
    let t = 0;
    form.productos.forEach(p => {
      const prod = productosDisponibles.find(pr => pr._id === p.producto);
      if (prod) t += prod.precio * p.cantidad;
    });
    setTotal(t);
  }, [form.productos, productosDisponibles]);

  const handleProductoChange = (idx, field, value) => {
    const nuevos = [...form.productos];
    nuevos[idx][field] = field === 'cantidad' ? Number(value) : value;
    setForm({ ...form, productos: nuevos });
  };

  const handleAddProducto = () => {
    setForm({ ...form, productos: [...form.productos, { producto: '', cantidad: 1 }] });
  };

  const handleRemoveProducto = idx => {
    const nuevos = [...form.productos];
    nuevos.splice(idx, 1);
    setForm({ ...form, productos: nuevos });
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Agregar fechaPedido automáticamente
    const data = { ...form, total, fechaPedido: new Date().toISOString().split('T')[0] };
    onSubmit(data);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h2 className="text-lg font-bold mb-6">{isEdit ? 'Editar Pedido' : 'Nuevo Pedido'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold mb-1">Cliente</label>
              <select name="usuario" value={form.usuario} onChange={handleChange} className="w-full border rounded px-2 py-1" required>
                <option value="">Selecciona cliente</option>
                {clientes.map(c => (
                  <option key={c._id} value={c._id}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold mb-1">Productos</label>
              {form.productos.map((p, idx) => (
                <div key={idx} className="flex gap-2 mb-2 items-center">
                  <select value={p.producto} onChange={e => handleProductoChange(idx, 'producto', e.target.value)} className="border rounded px-2 py-1" required>
                    <option value="">Selecciona producto</option>
                    {productosDisponibles.map(prod => (
                      <option key={prod._id} value={prod._id}>{prod.nombre} (Bs {prod.precio})</option>
                    ))}
                  </select>
                  <input type="number" min="1" value={p.cantidad} onChange={e => handleProductoChange(idx, 'cantidad', e.target.value)} className="border rounded px-2 py-1 w-20" required />
                  <button type="button" onClick={() => handleRemoveProducto(idx)} className="text-red-500 font-bold">X</button>
                </div>
              ))}
              <button type="button" onClick={handleAddProducto} className="bg-blue-500 text-white px-2 py-1 rounded">Agregar producto</button>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Estado</label>
              <select name="estado" value={form.estado} onChange={handleChange} className="w-full border rounded px-2 py-1">
                {estados.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold mb-1">Dirección de Entrega</label>
              <input name="direccionEntrega" value={form.direccionEntrega} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Dirección de entrega" />
            </div>
          </div>
          <div className="mb-4 font-bold">Total: Bs {total}</div>
          <div className="flex justify-end gap-2">
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">{isEdit ? 'Actualizar' : 'Registrar'}</button>
            <button type="button" className="bg-gray-200 px-6 py-2 rounded" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchPedidos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getPedidos();
      setPedidos(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleRegister = async (form) => {
    try {
      await createPedido({
        ...form,
        productos: form.productos.split(',').map(p => ({ producto: p.trim(), cantidad: 1 })),
        total: Number(form.total),
        estado: form.estado,
        direccionEntrega: form.direccionEntrega,
        fechaPedido: form.fechaPedido || undefined,
      });
      setModalOpen(false);
      fetchPedidos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (pedido) => {
    setEditData(pedido);
    setIsEdit(true);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditData(null);
    setIsEdit(false);
  };

  const handleEditSubmit = async (form) => {
    try {
      await updatePedido(editData._id, {
        ...form,
        productos: form.productos.split(',').map(p => ({ producto: p.trim(), cantidad: 1 })),
        total: Number(form.total),
        estado: form.estado,
        direccionEntrega: form.direccionEntrega,
        fechaPedido: form.fechaPedido || undefined,
      });
      handleModalClose();
      fetchPedidos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePedido(deleteId);
      setShowDeleteConfirm(false);
      setDeleteId(null);
      fetchPedidos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="p-6">
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
        {error && <div className="text-red-600 mb-2">{error}</div>}
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
            ) : pedidos.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">No hay pedidos</td>
              </tr>
            ) : (
              pedidos.map(pedido => (
                <tr key={pedido._id}>
                  {columns.map(col => {
                    if (col.isAction && col.key === 'edit') {
                      return (
                        <td key="edit" className="px-4 py-2 border-b text-center">
                          <button className="text-blue-600 hover:text-blue-800 p-1" title="Editar" onClick={() => handleEditClick(pedido)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z" /></svg>
                          </button>
                        </td>
                      );
                    }
                    if (col.isAction && col.key === 'delete') {
                      return (
                        <td key="delete" className="px-4 py-2 border-b text-center">
                          <button className="text-red-600 hover:text-red-800 p-1" title="Eliminar" onClick={() => handleDeleteClick(pedido._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </td>
                      );
                    }
                    if (col.key === 'productos') {
                      return (
                        <td key="productos" className="px-4 py-2 border-b whitespace-nowrap">
                          {pedido.productos && pedido.productos.length > 0
                            ? pedido.productos.map((p, i) => <span key={i}>{p.producto?.nombre || p.producto || ''} x{p.cantidad}{i < pedido.productos.length - 1 ? ', ' : ''}</span>)
                            : ''}
                        </td>
                      );
                    }
                    if (col.key === 'usuario') {
                      return (
                        <td key="usuario" className="px-4 py-2 border-b whitespace-nowrap">{pedido.usuario?.nombre || pedido.usuario || ''}</td>
                      );
                    }
                    if (col.key === 'fechaPedido') {
                      return (
                        <td key="fechaPedido" className="px-4 py-2 border-b whitespace-nowrap">{pedido.fechaPedido ? new Date(pedido.fechaPedido).toLocaleDateString() : ''}</td>
                      );
                    }
                    return (
                      <td key={col.key} className="px-4 py-2 border-b whitespace-nowrap">{pedido[col.key]}</td>
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
      <Modal open={modalOpen} onClose={handleModalClose} onSubmit={isEdit ? handleEditSubmit : handleRegister} initialData={editData} isEdit={isEdit} />
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p>¿Seguro que deseas eliminar este pedido?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteConfirm}>Eliminar</button>
              <button className="bg-gray-200 px-4 py-2 rounded" onClick={handleDeleteCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
