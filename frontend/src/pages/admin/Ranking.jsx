import React, { useEffect, useState } from 'react';
import { getRankings, createRanking, updateRanking, deleteRanking } from '../../services/rankingService';
import { getDepartamentos, createDepartamento } from '../../services/departamentoService';
import { uploadRankingAvatar } from '../../services/api';

const columns = [
  { label: 'Posición', key: 'posicion' },
  { label: 'Id', key: '_id' },
  { label: 'Jugador', key: 'jugador' },
  { label: 'Avatar', key: 'avatar', isImage: true },
  { label: 'Puntos', key: 'puntos' },
  { label: 'Partidas Jugadas', key: 'partidasJugadas' },
  { label: 'Victorias', key: 'victorias' },
  { label: '% Victoria', key: 'porcentajeVictoria' },
  { label: 'Nivel', key: 'nivel' },
  { label: 'Ubicación', key: 'ciudad' },
  { label: 'Tendencia', key: 'tendencia' },
  { label: 'Editar', key: 'edit', isAction: true },
  { label: 'Eliminar', key: 'delete', isAction: true },
];

const niveles = ['Novato', 'Intermedio', 'Avanzado', 'Experto'];

const initialForm = {
  jugador: '',
  avatar: '',
  puntos: '',
  partidasJugadas: '',
  victorias: '',
  nivel: 'Novato',
  ciudad: '',
};

const Modal = ({ open, onClose, onSubmit, initialData, isEdit, departamentos, onAddDepartamento }) => {
  const [form, setForm] = useState(initialForm);
  const [showDeptoInput, setShowDeptoInput] = useState(false);
  const [customDepto, setCustomDepto] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [errorVictorias, setErrorVictorias] = useState('');

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          ...initialData,
          puntos: initialData.puntos?.toString() || '',
          partidasJugadas: initialData.partidasJugadas?.toString() || '',
          victorias: initialData.victorias?.toString() || '',
        });
        setAvatarPreview(initialData.avatar || '');
        const isCustom = initialData.ciudad && !departamentos.map(d=>d.nombre).includes(initialData.ciudad);
        setCustomDepto(isCustom ? initialData.ciudad : '');
        setShowDeptoInput(isCustom);
      } else {
        setForm(initialForm);
        setAvatarPreview('');
        setCustomDepto('');
        setShowDeptoInput(false);
      }
    }
  }, [open, initialData, departamentos]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'victorias' || name === 'partidasJugadas') {
      const victorias = name === 'victorias' ? Number(value) : Number(form.victorias);
      const partidas = name === 'partidasJugadas' ? Number(value) : Number(form.partidasJugadas);
      if (victorias > partidas) {
        setErrorVictorias('El número de victorias no puede ser mayor que el de partidas jugadas');
      } else {
        setErrorVictorias('');
      }
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (!allowedTypes.includes(file.type)) {
        alert('Solo se permiten imágenes JPG, JPEG, PNG o WEBP.');
        return;
      }
      if (file.size > maxSize) {
        alert('El archivo excede el tamaño máximo de 2MB.');
        return;
      }
      setAvatarPreview(URL.createObjectURL(file));
      try {
        const data = new FormData();
        data.append('file', file);
        // Si es edición, envía el rankingId para que el backend elimine el avatar anterior
        if (isEdit && initialData && initialData._id) {
          data.append('rankingId', initialData._id);
        }
        const res = await fetch(import.meta.env.VITE_API_URL + '/upload/ranking', {
          method: 'POST',
          body: data,
        });
        const result = await res.json();
        setForm(f => ({ ...f, avatar: result.url }));
      } catch (err) {
        alert('Error al subir la imagen de avatar');
      }
    }
  };

  const handleDeptoChange = e => {
    const value = e.target.value;
    if (value === 'nuevo') {
      setForm(f => ({ ...f, ciudad: '' }));
      setCustomDepto('');
      setShowDeptoInput(true);
    } else {
      setForm(f => ({ ...f, ciudad: value }));
      setCustomDepto('');
      setShowDeptoInput(false);
    }
  };

  const handleAddDepto = async () => {
    if (!customDepto.trim()) return;
    const nuevo = await onAddDepartamento(customDepto.trim());
    setForm(f => ({ ...f, ciudad: nuevo.nombre }));
    setShowDeptoInput(false);
    setCustomDepto('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (Number(form.victorias) > Number(form.partidasJugadas)) {
      setErrorVictorias('El número de victorias no puede ser mayor que el de partidas jugadas');
      return;
    }
    setErrorVictorias('');
    // Asegura que puntos, partidasJugadas y victorias sean números
    const parsedForm = {
      ...form,
      puntos: Number(form.puntos),
      partidasJugadas: Number(form.partidasJugadas),
      victorias: Number(form.victorias)
    };
    onSubmit(parsedForm);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h2 className="text-lg font-bold mb-6">{isEdit ? 'Editar Ranking' : 'Nuevo Ranking'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold mb-1">Jugador</label>
              <input name="jugador" value={form.jugador} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="ID o nombre de jugador" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Avatar (URL o archivo)</label>
              <input name="avatar" value={form.avatar} onChange={handleChange} className="w-full border rounded px-2 py-1 mb-1" placeholder="URL de la foto" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="w-full border rounded px-2 py-1" />
              {avatarPreview && <img src={avatarPreview} alt="avatar" className="h-16 w-16 rounded-full mt-2" />}
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Puntos</label>
              <input name="puntos" type="number" value={form.puntos} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Puntos" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Partidas Jugadas</label>
              <input name="partidasJugadas" type="number" value={form.partidasJugadas} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Partidas jugadas" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Victorias</label>
              <input name="victorias" type="number" value={form.victorias} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Número de victorias" />
              {errorVictorias && <div className="text-red-600 text-xs mt-1">{errorVictorias}</div>}
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Nivel</label>
              <select name="nivel" value={form.nivel} onChange={handleChange} className="w-full border rounded px-2 py-1">
                {niveles.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold mb-1">Ubicación (Departamento)</label>
              <select
                name="ciudad"
                value={showDeptoInput ? 'nuevo' : (departamentos.map(d=>d.nombre).includes(form.ciudad) ? form.ciudad : '')}
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

const Ranking = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [departamentos, setDepartamentos] = useState([]);
  const [filtroCiudad, setFiltroCiudad] = useState('Todos');
  const [filtroNivel, setFiltroNivel] = useState('Todos');

  useEffect(() => {
    setLoading(true);
    getRankings()
      .then(data => setRankings(data))
      .catch(() => setRankings([]))
      .finally(() => setLoading(false));
    getDepartamentos().then(setDepartamentos).catch(() => setDepartamentos([]));
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 2500);
  };

  const handleRegister = async (form) => {
    try {
      if (isEdit && editData) {
        await updateRanking(editData._id, form);
        showToast('Ranking actualizado correctamente', 'success');
      } else {
        await createRanking(form);
        showToast('Ranking creado correctamente', 'success');
      }
      setModalOpen(false);
      setEditData(null);
      setIsEdit(false);
      setLoading(true);
      const data = await getRankings();
      setRankings(data);
    } catch (err) {
      let msg = isEdit ? 'Error al actualizar ranking' : 'Error al crear ranking';
      if (err && err.message) msg += ': ' + err.message;
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (ranking) => {
    setEditData(ranking);
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
      await deleteRanking(deleteId);
      setRankings(rankings.filter(r => r._id !== deleteId));
      showToast('Ranking eliminado correctamente', 'success');
    } catch (err) {
      showToast('Error al eliminar ranking', 'error');
    } finally {
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const handleAddDepartamento = async (nombre) => {
    const nuevo = await createDepartamento(nombre);
    setDepartamentos(deps => [...deps, nuevo]);
    return nuevo;
  };

  const ciudades = ['Todos', ...Array.from(new Set(rankings.map(r => r.ciudad)))];
  const nivelesUnicos = ['Todos', ...Array.from(new Set(rankings.map(r => r.nivel)))];

  const rankingsFiltrados = rankings.filter(r =>
    (filtroCiudad === 'Todos' || r.ciudad === filtroCiudad) &&
    (filtroNivel === 'Todos' || r.nivel === filtroNivel)
  );

  return (
    <div className="p-6">
      {toast.show && (
        <div className={`fixed top-6 right-6 z-[100] px-6 py-3 rounded shadow-lg text-white font-semibold transition-all ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
      {!loading && rankings.length === 0 && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 text-center font-semibold">No se encontraron rankings en la base de datos.</div>
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
      <div className="flex gap-4 mb-4">
        <div>
          <label className="mr-2">Filtrar por ubicación:</label>
          <select value={filtroCiudad} onChange={e => setFiltroCiudad(e.target.value)} className="border rounded px-2 py-1">
            {ciudades.map(ciudad => (
              <option key={ciudad} value={ciudad}>{ciudad}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2">Filtrar por nivel:</label>
          <select value={filtroNivel} onChange={e => setFiltroNivel(e.target.value)} className="border rounded px-2 py-1">
            {nivelesUnicos.map(nivel => (
              <option key={nivel} value={nivel}>{nivel}</option>
            ))}
          </select>
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
            ) : rankingsFiltrados.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">No hay rankings</td>
              </tr>
            ) : (
              rankingsFiltrados.map((ranking, idx) => (
                <tr key={ranking._id}>
                  {columns.map(col => {
                    if (col.isAction && col.key === 'edit') {
                      return (
                        <td key="edit" className="px-4 py-2 border-b text-center">
                          <button
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Editar"
                            onClick={() => handleEditClick(ranking)}
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
                            onClick={() => handleDeleteClick(ranking._id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </td>
                      );
                    }
                    if (col.isImage && col.key === 'avatar') {
                      return (
                        <td key="avatar" className="px-4 py-2 border-b text-center">
                          {ranking.avatar ? (
                            <img src={ranking.avatar} alt="avatar" className="h-10 w-10 rounded-full mx-auto" />
                          ) : (
                            <span className="text-gray-400">Sin foto</span>
                          )}
                        </td>
                      );
                    }
                    if (col.key === 'posicion') {
                      let posBg = '';
                      let posIcon = null;
                      if (idx === 0) {
                        posBg = 'bg-yellow-300 text-yellow-900 font-bold';
                        posIcon = <span title="Oro" className="mr-1">🥇</span>;
                      } else if (idx === 1) {
                        posBg = 'bg-gray-300 text-gray-800 font-bold';
                        posIcon = <span title="Plata" className="mr-1">🥈</span>;
                      } else if (idx === 2) {
                        posBg = 'bg-amber-700 text-white font-bold';
                        posIcon = <span title="Bronce" className="mr-1">🥉</span>;
                      }
                      return (
                        <td key="posicion" className={`px-4 py-2 border-b text-center ${posBg}`}>
                          {posIcon}{idx + 1}
                        </td>
                      );
                    }
                    if (col.key === 'tendencia') {
                      return (
                        <td key="tendencia" className="px-4 py-2 border-b whitespace-nowrap">
                          {ranking.tendencia > 0 && (
                            <span style={{ color: 'green', fontWeight: 'bold' }}>▲ +{ranking.tendencia}</span>
                          )}
                          {ranking.tendencia < 0 && (
                            <span style={{ color: 'red', fontWeight: 'bold' }}>▼ {ranking.tendencia}</span>
                          )}
                          {ranking.tendencia === 0 && (
                            <span style={{ color: '#888' }}>-</span>
                          )}
                          {ranking.tendencia === null && (
                            <span style={{ color: '#888' }}>-</span>
                          )}
                        </td>
                      );
                    }
                    return (
                      <td key={col.key} className="px-4 py-2 border-b whitespace-nowrap">{ranking[col.key]}</td>
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
      <Modal open={modalOpen} onClose={handleModalClose} onSubmit={handleRegister} initialData={editData} isEdit={isEdit} departamentos={departamentos} onAddDepartamento={handleAddDepartamento} />
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">¿Eliminar ranking?</h2>
            <p className="mb-6">¿Estás seguro de que deseas eliminar este ranking? Esta acción no se puede deshacer.</p>
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

export default Ranking;
