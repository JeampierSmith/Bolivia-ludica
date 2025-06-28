import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/common/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { TiendaHeader } from './Tienda';
import Modal from '../../components/common/Modal';
import LoginForm from '../../components/features/auth/LoginForm';
import UneteForm from '../../components/features/auth/UneteForm';

const API_URL = import.meta.env.VITE_API_URL || '';

const Perfil = () => {
  const { user, logout, setUser, login } = useAuth();
  // Modal login/registro state
  const [showAuth, setShowAuth] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [tab, setTab] = useState('perfil');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(user || {});
  const [errors, setErrors] = useState({});
  const [pedidoDetalle, setPedidoDetalle] = useState(null);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setForm(user || {});
  }, [user]);
  useEffect(() => {
    // Eliminar el header global de la app al entrar a la página
    const globalHeader = document.querySelector('header.bg-card');
    if (globalHeader) globalHeader.remove();
    return () => {
      // No restaurar el header global al salir
    };
  }, []);
  // Redirige si no hay usuario autenticado
  useEffect(() => {
    if (!user && !showAuth) {
      navigate('/tienda', { replace: true });
    }
  }, [user, showAuth, navigate]);
  // Si hay usuario autenticado, obtener datos reales del backend
  useEffect(() => {
    const fetchPerfil = async () => {
      if (!user || !user.token) return;
      try {
        const res = await fetch(`${API_URL}/usuarios/perfil`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setForm(data);
          setUser && setUser({ ...user, ...data });
        }
      } catch (err) {
        // Error al obtener perfil
      }
    };
    fetchPerfil();
  }, [user]);
  // Obtener pedidos del usuario autenticado
  useEffect(() => {
    const fetchPedidos = async () => {
      if (!user || !user.token) return;
      try {
        const res = await fetch(`${API_URL}/pedidos/mis-pedidos`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setPedidos(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        setPedidos([]);
      }
    };
    fetchPedidos();
  }, [user]);
  if (!user && !showAuth) {
    return null;
  }
  // Validation
  const validate = () => {
    const newErrors = {};
    if (!form.nombre?.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.correo?.trim()) newErrors.correo = 'El correo es obligatorio';
    if (form.telefono && !/^\d{7,15}$/.test(form.telefono)) newErrors.telefono = 'Teléfono inválido';
    if (editMode && form.nuevaContraseña && form.nuevaContraseña.length < 6) newErrors.nuevaContraseña = 'La contraseña debe tener al menos 6 caracteres';
    return newErrors;
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors({ ...errors, [name]: undefined });
  };
  const handleSave = async e => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Actualizar usuario en backend
      try {
        const res = await fetch(`${API_URL}/usuarios/${user._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify(form)
        });
        if (res.ok) {
          const updated = await res.json();
          setUser && setUser({ ...user, ...updated });
          setForm(updated);
          setEditMode(false);
        } else {
          const errData = await res.json();
          setErrors({ general: errData.msg || 'Error al actualizar perfil' });
        }
      } catch (err) {
        setErrors({ general: 'Error de red al actualizar perfil' });
      }
    }
  };
  const handleCancel = () => {
    setForm(user || {});
    setErrors({});
    setEditMode(false);
  };
  const getProductosPedido = (pedidoNumero) => {
    // Ejemplo: para demo, retorna todos los productos
    // En un caso real, deberías asociar productos a cada pedido
    return productos.slice(0, 2); // Demo: los dos primeros productos
  };
  const handleLogin = async (data) => {
    setAuthError('');
    setAuthSuccess('');
    try {
      const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: data.correo, contraseña: data.contraseña })
      });
      const result = await res.json();
      if (res.ok && result.usuario && result.usuario.rol === 'cliente') {
        login({ ...result.usuario, token: result.token });
        setShowAuth(false);
        setAuthSuccess('¡Bienvenido!');
        return true;
      } else if (res.ok && result.usuario) {
        setAuthError('Solo los clientes pueden iniciar sesión en la tienda.');
      } else {
        setAuthError(result.msg || 'Usuario o contraseña incorrectos.');
      }
    } catch (err) {
      setAuthError('Error de red al iniciar sesión.');
    }
    return false;
  };

  const handleRegister = async (data) => {
    setAuthError('');
    setAuthSuccess('');
    try {
      const res = await fetch(`/api/usuarios/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          rol: 'cliente',
          contraseña: data.password || data.contraseña
        })
      });
      const result = await res.json();
      if (res.ok) {
        setAuthSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setShowRegister(false);
      } else {
        setAuthError(result.msg || 'Error al registrar usuario');
      }
    } catch (err) {
      setAuthError('Error de red al registrar usuario');
    }
  };
  return (
    <div className="min-h-screen bg-[#f7f7f9]">
      <TiendaHeader onLoginClick={() => setShowAuth(true)} />
      {/* ...existing page content... */}
      <main className="container mx-auto px-2 py-10 max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 mb-6 md:mb-0" aria-label="Menú de usuario">
          <nav className="bg-white rounded-xl shadow flex flex-row md:flex-col gap-2 md:gap-0 p-2 md:p-0" aria-label="Navegación de perfil">
            <button onClick={() => setTab('perfil')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${tab==='perfil' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'}`} aria-current={tab==='perfil' ? 'page' : undefined}>Mi perfil</button>
            <button onClick={() => setTab('direcciones')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${tab==='direcciones' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'}`} aria-current={tab==='direcciones' ? 'page' : undefined}>Mis direcciones</button>
            <button onClick={() => setTab('pedidos')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${tab==='pedidos' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'}`} aria-current={tab==='pedidos' ? 'page' : undefined}>Mis pedidos</button>
            <button onClick={() => setTab('favoritos')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${tab==='favoritos' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'}`} aria-current={tab==='favoritos' ? 'page' : undefined}>Mi lista de deseos</button>
            <button onClick={() => setTab('cupones')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${tab==='cupones' ? 'bg-black text-white' : 'text-red-700 hover:bg-neutral-100'}`} aria-current={tab==='cupones' ? 'page' : undefined}>Mis cupones</button>
            <button onClick={() => { logout(); navigate('/tienda', { replace: true }); }} className="w-full text-left px-4 py-3 rounded-lg font-bold text-white bg-red-700 hover:bg-red-800 transition">Cerrar sesión</button>
          </nav>
        </aside>
        {/* Main content */}
        <section className="flex-1">
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4 text-black flex items-center gap-2">Hola {user.nombre || user.email} <span>👋</span></h1>
            {tab === 'perfil' && (
              <>
                <h2 className="text-xl font-bold mb-4 text-black">Datos personales</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSave} aria-label="Formulario de perfil">
                  <div className="col-span-2 mb-2 flex flex-col md:flex-row md:items-center gap-2">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900 p-3 rounded flex items-center gap-2 text-sm flex-1">
                      <strong className="font-bold text-black bg-white px-1 rounded">¿Necesitas actualizar tus datos?</strong> <span className="text-black">Si algunos de tus datos no pueden editarse, contáctanos.</span>
                    </div>
                    {!editMode && (
                      <button type="button" className="bg-black text-white px-4 py-2 rounded font-bold" onClick={() => setEditMode(true)} aria-label="Editar perfil">Editar</button>
                    )}
                  </div>
                  <div>
                    <label htmlFor="nombre" className="block text-xs font-bold mb-1 text-black">Nombre *</label>
                    <input id="nombre" type="text" name="nombre" className={`w-full border rounded px-3 py-2 bg-neutral-50 ${errors.nombre ? 'border-red-500' : ''}`} value={form.nombre ?? ''} onChange={handleChange} disabled={!editMode} aria-required="true" />
                    {errors.nombre && <div className="text-xs text-red-500 mt-1">{errors.nombre}</div>}
                  </div>
                  <div>
                    <label htmlFor="correo" className="block text-xs font-bold mb-1 text-black">Correo electrónico</label>
                    <input id="correo" type="email" name="correo" className="w-full border rounded px-3 py-2 bg-white text-black" value={form.correo ?? ''} disabled aria-label="Correo electrónico" />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-xs font-bold mb-1 text-black">Teléfono</label>
                    <input id="telefono" type="text" name="telefono" className={`w-full border rounded px-3 py-2 bg-neutral-50 ${errors.telefono ? 'border-red-500' : ''}`} value={form.telefono ?? ''} onChange={handleChange} disabled={!editMode} />
                    {errors.telefono && <div className="text-xs text-red-500 mt-1">{errors.telefono}</div>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="direccion" className="block text-xs font-bold mb-1 text-black">Dirección</label>
                    <input id="direccion" type="text" name="direccion" className="w-full border rounded px-3 py-2 bg-neutral-50" value={form.direccion ?? ''} onChange={handleChange} disabled={!editMode} />
                  </div>
                  {editMode && (
                    <div className="md:col-span-2">
                      <label htmlFor="nuevaContraseña" className="block text-xs font-bold mb-1 text-black">Nueva contraseña (opcional)</label>
                      <input id="nuevaContraseña" type="password" name="nuevaContraseña" className={`w-full border rounded px-3 py-2 bg-neutral-50 ${errors.nuevaContraseña ? 'border-red-500' : ''}`} value={form.nuevaContraseña ?? ''} onChange={handleChange} autoComplete="new-password" />
                      {errors.nuevaContraseña && <div className="text-xs text-red-500 mt-1">{errors.nuevaContraseña}</div>}
                    </div>
                  )}
                  <div className="col-span-2 flex flex-col md:flex-row gap-2 mt-2">
                    {editMode ? (
                      <>
                        <button type="submit" className="bg-black text-white px-6 py-2 rounded font-bold w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" aria-label="Guardar cambios de perfil">Guardar</button>
                        <button type="button" className="text-black font-bold underline w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" onClick={handleCancel} aria-label="Cancelar edición de perfil">Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button type="button" className="bg-black text-white px-6 py-2 rounded font-bold w-full md:w-auto" disabled>Guardar</button>
                        <button type="button" className="text-black font-bold underline w-full md:w-auto" onClick={() => setEditMode(true)}>Cambiar contraseña</button>
                      </>
                    )}
                  </div>
                </form>
              </>
            )}
            {tab === 'direcciones' && (
              <>
                <h2 className="text-xl font-bold mb-4 text-black">Mis direcciones</h2>
                <div className="text-black">Próximamente podrás gestionar tus direcciones de envío aquí.</div>
              </>
            )}
            {tab === 'pedidos' && (
              <>
                <h2 className="text-xl font-bold mb-4 text-black">Mis pedidos</h2>
                <div className="overflow-x-auto">
                  {!pedidoDetalle ? (
                    <table className="w-full text-sm bg-white">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="py-2">Usuario</th>
                          <th>Productos</th>
                          <th>Total</th>
                          <th>Estado</th>
                          <th>Dirección</th>
                          <th>Fecha</th>
                          <th>Detalle</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedidos.length === 0 ? (
                          <tr><td colSpan={7} className="text-center py-4 text-gray-500">No tienes pedidos registrados.</td></tr>
                        ) : (
                          pedidos.map(p => (
                            <tr key={p._id || p.numero} className="border-b hover:bg-gray-50">
                              <td>{p.usuario?.nombre || '-'}</td>
                              <td>
                                <ul className="list-disc pl-4">
                                  {(p.productos || []).map((prod, i) => (
                                    <li key={i}>
                                      {prod.producto?.nombre || '-'} x{prod.cantidad}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td>Bs {p.total}</td>
                              <td><span className="font-bold text-black bg-white px-1 rounded">{p.estado || '-'}</span></td>
                              <td>{p.direccionEntrega || '-'}</td>
                              <td>{p.fechaPedido ? new Date(p.fechaPedido).toLocaleDateString() : (p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '-')}</td>
                              <td>
                                <button
                                  className="text-primary underline"
                                  onClick={() => setPedidoDetalle(p)}
                                >
                                  Ver
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <div className="bg-neutral-50 rounded-xl shadow p-6 max-w-md mx-auto">
                      <h3 className="text-xl font-bold mb-2 text-black">Detalle del pedido #{pedidoDetalle.numero || pedidoDetalle._id?.slice(-6) || '-'}</h3>
                      <div className="mb-2"><b>Fecha:</b> {pedidoDetalle.fecha ? new Date(pedidoDetalle.fecha).toLocaleDateString() : '-'}</div>
                      <div className="mb-2"><b>Estado:</b> {pedidoDetalle.estado || '-'}</div>
                      <div className="mb-2"><b>Total:</b> Bs {pedidoDetalle.total}</div>
                      <div className="mb-4">
                        <b>Productos:</b>
                        <ul className="mt-2">
                          {(pedidoDetalle.productos || []).map((prod, idx) => (
                            <li key={idx} className="flex items-center gap-2 mb-2">
                              <img src={prod.imagen || '/assets/image/placeholder-product.png'} alt={prod.nombre || 'Producto'} className="w-10 h-10 object-contain rounded border" />
                              <span className="font-semibold text-black">{prod.nombre || '-'}</span>
                              <span className="text-gray-500">{prod.precio ? `Bs ${prod.precio}` : ''}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        className="mt-4 bg-black text-white px-4 py-2 rounded font-bold"
                        onClick={() => setPedidoDetalle(null)}
                      >
                        Volver a la lista
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            {tab === 'favoritos' && (
              <>
                <h2 className="text-xl font-bold mb-4 text-black">Mis pedidos (resumen)</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm bg-white">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="py-2">Usuario</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Dirección</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidos.length === 0 ? (
                        <tr><td colSpan={6} className="text-center py-4 text-gray-500">No tienes pedidos registrados.</td></tr>
                      ) : (
                        pedidos.map((p, idx) => (
                          <tr key={p._id || idx} className="border-b hover:bg-gray-50">
                            <td>{p.usuario?.nombre || '-'}</td>
                            <td>
                              <ul className="list-disc pl-4">
                                {(p.productos || []).map((prod, i) => (
                                  <li key={i}>
                                    {prod.producto?.nombre || '-'} x{prod.cantidad}
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td>Bs {p.total}</td>
                            <td><span className="font-bold text-black bg-white px-1 rounded">{p.estado || '-'}</span></td>
                            <td>{p.direccionEntrega || '-'}</td>
                            <td>{p.fechaPedido ? new Date(p.fechaPedido).toLocaleDateString() : (p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '-')}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {tab === 'cupones' && (
              <>
                <h2 className="text-xl font-bold mb-4 text-black">Mis cupones</h2>
                <div className="text-black">Próximamente podrás ver tus cupones aquí.</div>
              </>
            )}
          </div>
        </section>
      </main>
      {/* Modal de login/registro unificado */}
      <Modal isOpen={showAuth} onClose={() => setShowAuth(false)} ariaLabel={showRegister ? 'Registro' : 'Iniciar sesión'}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">{showRegister ? 'Crea tu cuenta' : 'Iniciar sesión'}</h2>
        {authError && (
          <div className="mb-2 text-center text-xs text-red-600 font-semibold bg-red-50 border border-red-200 rounded p-2">{authError}</div>
        )}
        {authSuccess && (
          <div className="mb-2 text-center text-xs text-green-700 font-semibold bg-green-50 border border-green-200 rounded p-2">{authSuccess}</div>
        )}
        {showRegister ? (
          <UneteForm onRegister={handleRegister} onShowLogin={() => setShowRegister(false)} />
        ) : (
          <LoginForm onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
        )}
      </Modal>
    </div>
  );
};

export default Perfil;
