import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaDice } from 'react-icons/fa';
import { getEventos, createEvento, updateEvento, deleteEvento, getParticipacionDepartamental, updateParticipacionDepartamental, getActividadesEspeciales, createActividadEspecial, updateActividadEspecial, deleteActividadEspecial } from '../../services/api';

const departamentos = [
  'La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí', 'Chuquisaca', 'Tarija', 'Beni', 'Pando'
];

const tiposActividad = [
  'La Mesa Creativa', 'Food Truck', 'Taller', 'Networking', 'Otro'
];

const initialEvento = { nombre: '', descripcion: '', fecha: '', imagen: '', estado: 'activo' };
const initialActividad = { nombre: '', tipo: '', descripcion: '', icono: '', estado: 'activo', eventoId: '' };

export default function BoliviaJuega() {
  // --- Eventos ---
  const [eventos, setEventos] = useState([]);
  const [eventoForm, setEventoForm] = useState(initialEvento);
  const [editEventoId, setEditEventoId] = useState(null);
  const [showEventoForm, setShowEventoForm] = useState(false);
  // --- Participación ---
  const [participacion, setParticipacion] = useState([]);
  // --- Actividades ---
  const [actividades, setActividades] = useState([]);
  const [actividadForm, setActividadForm] = useState(initialActividad);
  const [editActividadId, setEditActividadId] = useState(null);
  const [showActividadForm, setShowActividadForm] = useState(false);

  // --- Cargar datos ---
  useEffect(() => {
    fetchEventos();
    fetchParticipacion();
    fetchActividades();
  }, []);

  async function fetchEventos() {
    try {
      const data = await getEventos();
      setEventos(data);
    } catch (e) { setEventos([]); }
  }
  async function fetchParticipacion() {
    try {
      const data = await getParticipacionDepartamental();
      setParticipacion(data);
    } catch (e) { setParticipacion([]); }
  }
  async function fetchActividades() {
    try {
      const data = await getActividadesEspeciales();
      setActividades(data);
    } catch (e) { setActividades([]); }
  }

  // --- CRUD Eventos ---
  const handleEventoChange = e => setEventoForm({ ...eventoForm, [e.target.name]: e.target.value });
  const handleEventoSubmit = async e => {
    e.preventDefault();
    if (!eventoForm.nombre || !eventoForm.fecha) return;
    if (editEventoId) {
      await updateEvento(editEventoId, eventoForm);
    } else {
      await createEvento(eventoForm);
    }
    setEventoForm(initialEvento);
    setEditEventoId(null);
    setShowEventoForm(false);
    fetchEventos();
  };
  const handleEditEvento = evento => {
    setEventoForm(evento);
    setEditEventoId(evento._id);
    setShowEventoForm(true);
  };
  const handleDeleteEvento = async id => {
    if (window.confirm('¿Eliminar evento?')) {
      await deleteEvento(id);
      fetchEventos();
    }
  };

  // --- CRUD Participación ---
  const handleParticipacionChange = (id, cantidad) => {
    setParticipacion(participacion.map(p => p._id === id ? { ...p, cantidad } : p));
  };
  const handleParticipacionSave = async (id, cantidad) => {
    await updateParticipacionDepartamental(id, { cantidad });
    fetchParticipacion();
  };

  // --- CRUD Actividades ---
  const handleActividadChange = e => setActividadForm({ ...actividadForm, [e.target.name]: e.target.value });
  const handleActividadSubmit = async e => {
    e.preventDefault();
    if (!actividadForm.nombre || !actividadForm.tipo || !actividadForm.eventoId) return;
    if (editActividadId) {
      await updateActividadEspecial(editActividadId, actividadForm);
    } else {
      await createActividadEspecial(actividadForm);
    }
    setActividadForm(initialActividad);
    setEditActividadId(null);
    setShowActividadForm(false);
    fetchActividades();
  };
  const handleEditActividad = actividad => {
    setActividadForm(actividad);
    setEditActividadId(actividad._id);
    setShowActividadForm(true);
  };
  const handleDeleteActividad = async id => {
    if (window.confirm('¿Eliminar actividad?')) {
      await deleteActividadEspecial(id);
      fetchActividades();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2"><FaDice className="text-blue-600" /> Bolivia Juega</h1>
      {/* --- Sección A: Gestión de eventos --- */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Gestión de eventos</h2>
          <button className="btn btn-primary flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => { setShowEventoForm(true); setEditEventoId(null); setEventoForm(initialEvento); }}><FaPlus /> Nuevo evento</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Nombre</th>
                <th className="p-2">Descripción</th>
                <th className="p-2">Fecha</th>
                <th className="p-2">Imagen</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map(ev => (
                <tr key={ev._id} className="border-b">
                  <td className="p-2 font-semibold">{ev.nombre}</td>
                  <td className="p-2">{ev.descripcion}</td>
                  <td className="p-2">{ev.fecha?.slice(0,10)}</td>
                  <td className="p-2">{ev.imagen ? <img src={ev.imagen} alt="banner" className="w-20 h-12 object-cover rounded" /> : '-'}</td>
                  <td className="p-2">{ev.estado}</td>
                  <td className="p-2 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEditEvento(ev)} title="Editar"><FaEdit /></button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteEvento(ev._id)} title="Eliminar"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Formulario evento */}
        {showEventoForm && (
          <form className="bg-white p-6 rounded shadow mt-4 max-w-lg mx-auto" onSubmit={handleEventoSubmit}>
            <h3 className="text-lg font-bold mb-2">{editEventoId ? 'Editar evento' : 'Nuevo evento'}</h3>
            <div className="mb-2">
              <label className="block font-semibold">Nombre</label>
              <input name="nombre" value={eventoForm.nombre} onChange={handleEventoChange} className="input input-bordered w-full border p-2 rounded" required />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Descripción</label>
              <textarea name="descripcion" value={eventoForm.descripcion} onChange={handleEventoChange} className="input input-bordered w-full border p-2 rounded" />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Fecha</label>
              <input type="date" name="fecha" value={eventoForm.fecha} onChange={handleEventoChange} className="input input-bordered w-full border p-2 rounded" required />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Imagen (URL)</label>
              <input name="imagen" value={eventoForm.imagen} onChange={handleEventoChange} className="input input-bordered w-full border p-2 rounded" />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Estado</label>
              <select name="estado" value={eventoForm.estado} onChange={handleEventoChange} className="input input-bordered w-full border p-2 rounded">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn btn-success bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"><FaSave /> Guardar</button>
              <button type="button" className="btn btn-secondary bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 flex items-center gap-2" onClick={() => { setShowEventoForm(false); setEditEventoId(null); setEventoForm(initialEvento); }}><FaTimes /> Cancelar</button>
            </div>
          </form>
        )}
      </section>

      {/* --- Sección B: Participación por departamento --- */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Participación por departamento</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Evento</th>
                <th className="p-2">Departamento</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {participacion.map(p => (
                <tr key={p._id} className="border-b">
                  <td className="p-2">{eventos.find(ev => ev._id === p.eventoId)?.nombre || '-'}</td>
                  <td className="p-2">{p.departamento}</td>
                  <td className="p-2">
                    <input type="number" min="0" value={p.cantidad} onChange={e => handleParticipacionChange(p._id, e.target.value)} className="w-20 border rounded p-1" />
                  </td>
                  <td className="p-2">
                    <button className="text-green-600 hover:text-green-800" onClick={() => handleParticipacionSave(p._id, p.cantidad)} title="Guardar"><FaSave /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* --- Sección C: Actividades especiales --- */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Actividades especiales</h2>
          <button className="btn btn-primary flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => { setShowActividadForm(true); setEditActividadId(null); setActividadForm(initialActividad); }}><FaPlus /> Nueva actividad</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Nombre</th>
                <th className="p-2">Tipo</th>
                <th className="p-2">Descripción</th>
                <th className="p-2">Ícono</th>
                <th className="p-2">Evento</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {actividades.map(act => (
                <tr key={act._id} className="border-b">
                  <td className="p-2 font-semibold">{act.nombre}</td>
                  <td className="p-2">{act.tipo}</td>
                  <td className="p-2">{act.descripcion}</td>
                  <td className="p-2 text-2xl">{act.icono}</td>
                  <td className="p-2">{eventos.find(ev => ev._id === act.eventoId)?.nombre || '-'}</td>
                  <td className="p-2">{act.estado}</td>
                  <td className="p-2 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEditActividad(act)} title="Editar"><FaEdit /></button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteActividad(act._id)} title="Eliminar"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Formulario actividad */}
        {showActividadForm && (
          <form className="bg-white p-6 rounded shadow mt-4 max-w-lg mx-auto" onSubmit={handleActividadSubmit}>
            <h3 className="text-lg font-bold mb-2">{editActividadId ? 'Editar actividad' : 'Nueva actividad'}</h3>
            <div className="mb-2">
              <label className="block font-semibold">Nombre</label>
              <input name="nombre" value={actividadForm.nombre} onChange={handleActividadChange} className="input input-bordered w-full border p-2 rounded" required />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Tipo</label>
              <select name="tipo" value={actividadForm.tipo} onChange={handleActividadChange} className="input input-bordered w-full border p-2 rounded" required>
                <option value="">Seleccionar</option>
                {tiposActividad.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Descripción</label>
              <textarea name="descripcion" value={actividadForm.descripcion} onChange={handleActividadChange} className="input input-bordered w-full border p-2 rounded" />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Ícono (emoji o clase)</label>
              <input name="icono" value={actividadForm.icono} onChange={handleActividadChange} className="input input-bordered w-full border p-2 rounded" />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Evento</label>
              <select name="eventoId" value={actividadForm.eventoId} onChange={handleActividadChange} className="input input-bordered w-full border p-2 rounded" required>
                <option value="">Seleccionar evento</option>
                {eventos.map(ev => <option key={ev._id} value={ev._id}>{ev.nombre}</option>)}
              </select>
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Estado</label>
              <select name="estado" value={actividadForm.estado} onChange={handleActividadChange} className="input input-bordered w-full border p-2 rounded">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn btn-success bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"><FaSave /> Guardar</button>
              <button type="button" className="btn btn-secondary bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 flex items-center gap-2" onClick={() => { setShowActividadForm(false); setEditActividadId(null); setActividadForm(initialActividad); }}><FaTimes /> Cancelar</button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
