import React, { useEffect, useState } from 'react';

const columns = [
  { label: 'Id', key: '_id' },
  { label: 'Jugador', key: 'jugador' },
  { label: 'Puntos', key: 'puntos' },
  { label: 'Partidas Jugadas', key: 'partidasJugadas' },
  { label: 'Nivel', key: 'nivel' },
  { label: 'Ciudad', key: 'ciudad' },
  { label: 'Editar', key: 'edit', isAction: true },
  { label: 'Eliminar', key: 'delete', isAction: true },
];

const niveles = ['Novato', 'Intermedio', 'Avanzado', 'Experto'];

const initialForm = {
  jugador: '',
  puntos: '',
  partidasJugadas: '',
  nivel: 'Novato',
  ciudad: '',
};

const Modal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (open) setForm(initialForm);
  }, [open]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h2 className="text-lg font-bold mb-6">Nuevo Ranking</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold mb-1">Jugador</label>
              <input name="jugador" value={form.jugador} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="ID o nombre de jugador" required />
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
              <label className="block text-xs font-bold mb-1">Nivel</label>
              <select name="nivel" value={form.nivel} onChange={handleChange} className="w-full border rounded px-2 py-1">
                {niveles.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold mb-1">Ciudad</label>
              <input name="ciudad" value={form.ciudad} onChange={handleChange} className="w-full border rounded px-2 py-1" placeholder="Ciudad" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Registrar</button>
            <button type="button" className="bg-gray-200 px-6 py-2 rounded" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleRegister = (form) => {
    setModalOpen(false);
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
            ) : ranking.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">No hay registros</td>
              </tr>
            ) : (
              ranking.map(item => (
                <tr key={item._id}>
                  {columns.map(col => {
                    if (col.isAction && col.key === 'edit') {
                      return (
                        <td key="edit" className="px-4 py-2 border-b text-center">
                          <button className="text-blue-600 hover:text-blue-800 p-1" title="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z" /></svg>
                          </button>
                        </td>
                      );
                    }
                    if (col.isAction && col.key === 'delete') {
                      return (
                        <td key="delete" className="px-4 py-2 border-b text-center">
                          <button className="text-red-600 hover:text-red-800 p-1" title="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </td>
                      );
                    }
                    return (
                      <td key={col.key} className="px-4 py-2 border-b whitespace-nowrap">{item[col.key]}</td>
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
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleRegister} />
    </div>
  );
};

export default Ranking;
