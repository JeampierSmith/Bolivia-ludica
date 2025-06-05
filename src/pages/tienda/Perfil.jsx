import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/common/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { TiendaHeader } from './Tienda';

const pedidosEjemplo = [
  { fecha: '2025-06-01', numero: '0001', estado: 'Entregado', total: 120, detalle: '/pedido/0001' },
  { fecha: '2025-05-20', numero: '0002', estado: 'Pendiente', total: 80, detalle: '/pedido/0002' },
];
const favoritosEjemplo = [
  { nombre: 'Bolígrafo', imagen: '/Bolivia-ludica/assets/image/productos/boligrafo.png', precio: 'Bs 10' },
  { nombre: 'Camiseta', imagen: '/Bolivia-ludica/assets/image/productos/camiseta.png', precio: 'Bs 150' },
];

const Perfil = () => {
  const { user, logout, setUser } = useAuth();
  const [tab, setTab] = useState('perfil');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(user || {});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setForm(user || {});
  }, [user]);
  useEffect(() => {
    const globalHeader = document.querySelector('header.bg-card');
    if (globalHeader) globalHeader.style.display = 'none';
    return () => {
      if (globalHeader) globalHeader.style.display = '';
    };
  }, []);
  // Redirige si no hay usuario autenticado
  useEffect(() => {
    if (!user) {
      navigate('/tienda', { replace: true });
    }
  }, [user, navigate]);
  if (!user) {
    // Render nothing, redirection will happen
    return null;
  }
  // Validation
  const validate = () => {
    const newErrors = {};
    if (!form.nombre?.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.apellido?.trim()) newErrors.apellido = 'El primer apellido es obligatorio';
    if (!form.celular?.trim() || !/^\d{8}$/.test(form.celular)) newErrors.celular = 'Celular inválido (8 dígitos)';
    if (!form.nacimiento) newErrors.nacimiento = 'Fecha de nacimiento obligatoria';
    if (!form.sexo) newErrors.sexo = 'Selecciona tu sexo';
    if (!form.tipoDocumento) newErrors.tipoDocumento = 'Selecciona tipo de documento';
    if (!form.nroDocumento?.trim()) newErrors.nroDocumento = 'Número de documento obligatorio';
    return newErrors;
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors({ ...errors, [name]: undefined });
  };
  const handleSave = e => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setUser && setUser({ ...user, ...form });
      setEditMode(false);
    }
  };
  const handleCancel = () => {
    setForm(user || {});
    setErrors({});
    setEditMode(false);
  };
  return (
    <div className="min-h-screen bg-[#f7f7f9]">
      <TiendaHeader />
      <main className="container mx-auto px-2 py-10 max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 mb-6 md:mb-0">
          <nav className="bg-white rounded-xl shadow flex flex-row md:flex-col gap-2 md:gap-0 p-2 md:p-0">
            <button onClick={() => setTab('perfil')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${tab==='perfil' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'}`}>Mi perfil</button>
            <button onClick={() => setTab('direcciones')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${tab==='direcciones' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'}`}>Mis direcciones</button>
            <button onClick={() => setTab('pedidos')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${tab==='pedidos' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'}`}>Mis pedidos</button>
            <button onClick={() => setTab('favoritos')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${tab==='favoritos' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'}`}>Mi lista de deseos</button>
            <button onClick={() => setTab('cupones')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${tab==='cupones' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'}`}>Mis cupones</button>
            <button onClick={logout} className="w-full text-left px-4 py-3 rounded-lg font-bold text-red-500 hover:bg-neutral-100 transition">Cerrar sesión</button>
          </nav>
        </aside>
        {/* Main content */}
        <section className="flex-1">
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-black flex items-center gap-2">Hola {user.nombre || user.email} <span>👋</span></h2>
            {tab === 'perfil' && (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSave}>
                <div className="col-span-2 mb-2 flex flex-col md:flex-row md:items-center gap-2">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-3 rounded flex items-center gap-2 text-sm flex-1">
                    <span className="font-bold">¿Necesitas actualizar tus datos?</span> Si algunos de tus datos no pueden editarse, contáctanos.
                  </div>
                  {!editMode && (
                    <button type="button" className="bg-black text-white px-4 py-2 rounded font-bold" onClick={() => setEditMode(true)}>
                      Editar
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-black">Nombre *</label>
                  <input type="text" name="nombre" className={`w-full border rounded px-3 py-2 bg-neutral-50 ${errors.nombre ? 'border-red-500' : ''}`} value={form.nombre || ''} onChange={handleChange} disabled={!editMode} />
                  {errors.nombre && <div className="text-xs text-red-500 mt-1">{errors.nombre}</div>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-black">Primer apellido *</label>
                  <input type="text" name="apellido" className={`w-full border rounded px-3 py-2 bg-neutral-50 ${errors.apellido ? 'border-red-500' : ''}`} value={form.apellido || ''} onChange={handleChange} disabled={!editMode} />
                  {errors.apellido && <div className="text-xs text-red-500 mt-1">{errors.apellido}</div>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-black">Segundo apellido</label>
                  <input type="text" name="segundoApellido" className="w-full border rounded px-3 py-2 bg-neutral-50" value={form.segundoApellido || ''} onChange={handleChange} disabled={!editMode} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-black">Número de teléfono</label>
                  <input type="text" name="celular" className={`w-full border rounded px-3 py-2 bg-neutral-50 ${errors.celular ? 'border-red-500' : ''}`} value={form.celular || ''} onChange={handleChange} disabled={!editMode} />
                  {errors.celular && <div className="text-xs text-red-500 mt-1">{errors.celular}</div>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-black">Fecha de nacimiento</label>
                  <input type="date" name="nacimiento" className={`w-full border rounded px-3 py-2 bg-neutral-50 ${errors.nacimiento ? 'border-red-500' : ''}`} value={form.nacimiento || ''} onChange={handleChange} disabled={!editMode} />
                  {errors.nacimiento && <div className="text-xs text-red-500 mt-1">{errors.nacimiento}</div>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-black">Sexo</label>
                  {editMode ? (
                    <select name="sexo" className={`w-full border rounded px-3 py-2 bg-neutral-50 ${errors.sexo ? 'border-red-500' : ''}`} value={form.sexo || ''} onChange={handleChange}>
                      <option value="">Selecciona</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                      <option value="O">Otro</option>
                    </select>
                  ) : (
                    <input type="text" className="w-full border rounded px-3 py-2 bg-neutral-50" value={form.sexo || ''} disabled />
                  )}
                  {errors.sexo && <div className="text-xs text-red-500 mt-1">{errors.sexo}</div>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-black">Tipo de documento</label>
                  {editMode ? (
                    <select name="tipoDocumento" className={`w-full border rounded px-3 py-2 bg-neutral-50 ${errors.tipoDocumento ? 'border-red-500' : ''}`} value={form.tipoDocumento || ''} onChange={handleChange}>
                      <option value="">Selecciona</option>
                      <option value="CI">Cédula de Identidad</option>
                      <option value="PAS">Pasaporte</option>
                      <option value="OTRO">Otro</option>
                    </select>
                  ) : (
                    <input type="text" className="w-full border rounded px-3 py-2 bg-neutral-50" value={form.tipoDocumento || 'Carnet de Identidad'} disabled />
                  )}
                  {errors.tipoDocumento && <div className="text-xs text-red-500 mt-1">{errors.tipoDocumento}</div>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-black">Número de documento</label>
                  <input type="text" name="nroDocumento" className={`w-full border rounded px-3 py-2 bg-neutral-50 ${errors.nroDocumento ? 'border-red-500' : ''}`} value={form.nroDocumento || ''} onChange={handleChange} disabled={!editMode} />
                  {errors.nroDocumento && <div className="text-xs text-red-500 mt-1">{errors.nroDocumento}</div>}
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold mb-1 text-black">Correo electrónico</label>
                  <input type="email" className="w-full border rounded px-3 py-2 bg-neutral-50" value={form.email} disabled />
                </div>
                {editMode ? (
                  <div className="col-span-2 flex flex-col md:flex-row gap-2 mt-2">
                    <button type="submit" className="bg-black text-white px-6 py-2 rounded font-bold w-full md:w-auto">Guardar</button>
                    <button type="button" className="text-black font-bold underline w-full md:w-auto" onClick={handleCancel}>Cancelar</button>
                  </div>
                ) : (
                  <div className="col-span-2 flex flex-col md:flex-row gap-2 mt-2">
                    <button type="button" className="bg-black text-white px-6 py-2 rounded font-bold w-full md:w-auto" disabled>Guardar</button>
                    <button type="button" className="text-black font-bold underline w-full md:w-auto">Cambiar contraseña</button>
                  </div>
                )}
              </form>
            )}
            {tab === 'direcciones' && (
              <div className="text-black">Próximamente podrás gestionar tus direcciones de envío aquí.</div>
            )}
            {tab === 'pedidos' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm bg-white">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Fecha</th>
                      <th>N° Pedido</th>
                      <th>Estado</th>
                      <th>Total</th>
                      <th>Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidosEjemplo.map(p => (
                      <tr key={p.numero} className="border-b hover:bg-gray-50">
                        <td className="py-2">{p.fecha}</td>
                        <td>{p.numero}</td>
                        <td>{p.estado}</td>
                        <td>Bs {p.total}</td>
                        <td><Link to={p.detalle} className="text-primary underline">Ver</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {tab === 'favoritos' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {favoritosEjemplo.map((f, i) => (
                  <div key={i} className="bg-neutral-50 rounded shadow p-2 flex flex-col items-center border border-neutral-200">
                    <img src={f.imagen} alt={f.nombre} className="w-16 h-16 object-contain mb-2" />
                    <div className="font-semibold text-center text-sm text-black">{f.nombre}</div>
                    <div className="text-xs text-gray-500">{f.precio}</div>
                    <button className="text-primary underline text-xs mt-1">Ver producto</button>
                  </div>
                ))}
              </div>
            )}
            {tab === 'cupones' && (
              <div className="text-black">Próximamente podrás ver tus cupones aquí.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Perfil;
