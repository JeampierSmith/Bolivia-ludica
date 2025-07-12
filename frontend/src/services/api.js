// Servicio base para peticiones a la API
const API_URL = '/api';

// --- Ranking ---
export async function getRanking() {
  const res = await fetch(`${API_URL}/ranking`);
  if (!res.ok) throw new Error('Error al obtener ranking');
  return res.json();
}

export async function createRanking(data) {
  const res = await fetch(`${API_URL}/ranking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear ranking');
  return res.json();
}

export async function deleteRanking(id) {
  const res = await fetch(`${API_URL}/ranking/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar ranking');
  return res.json();
}

// --- Usuarios ---
export async function getUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`);
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
}

export async function createUsuario(data) {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear usuario');
  return res.json();
}

export async function deleteUsuario(id) {
  const res = await fetch(`${API_URL}/usuarios/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar usuario');
  return res.json();
}

// --- Productos ---
export async function getProductos() {
  const res = await fetch(`${API_URL}/productos`);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export async function createProducto(data) {
  const res = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return res.json();
}

export async function deleteProducto(id) {
  const res = await fetch(`${API_URL}/productos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar producto');
  return res.json();
}

// --- Tiendas ---
export async function getTiendas() {
  const res = await fetch(`${API_URL}/tiendas`);
  if (!res.ok) throw new Error('Error al obtener tiendas');
  return res.json();
}

export async function createTienda(data) {
  const res = await fetch(`${API_URL}/tiendas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear tienda');
  return res.json();
}

export async function deleteTienda(id) {
  const res = await fetch(`${API_URL}/tiendas/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar tienda');
  return res.json();
}

// --- Pedidos ---
export async function getPedidos() {
  const res = await fetch(`${API_URL}/pedidos`);
  if (!res.ok) throw new Error('Error al obtener pedidos');
  return res.json();
}

export async function createPedido(data) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear pedido');
  return res.json();
}

export async function deletePedido(id) {
  const res = await fetch(`${API_URL}/pedidos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar pedido');
  return res.json();
}

// --- Upload (para imágenes y logos) ---
export async function uploadProductoImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/upload/producto`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Error al subir imagen de producto');
  return res.json();
}

export async function uploadTiendaLogo(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/upload/tienda`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Error al subir logo de tienda');
  return res.json();
}

export async function uploadRankingAvatar(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/upload/ranking`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Error al subir avatar de jugador');
  return res.json();
}

// --- Bolivia Juega: Eventos ---
export async function getEventos() {
  const res = await fetch(`${API_URL}/eventos`);
  if (!res.ok) throw new Error('Error al obtener eventos');
  return res.json();
}
export async function createEvento(data) {
  const res = await fetch(`${API_URL}/eventos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear evento');
  return res.json();
}
export async function updateEvento(id, data) {
  const res = await fetch(`${API_URL}/eventos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar evento');
  return res.json();
}
export async function deleteEvento(id) {
  const res = await fetch(`${API_URL}/eventos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar evento');
  return res.json();
}

// --- Participación Departamental ---
export async function getParticipacionDepartamental() {
  const res = await fetch(`${API_URL}/participacionDepartamental`);
  if (!res.ok) throw new Error('Error al obtener participación');
  return res.json();
}
export async function updateParticipacionDepartamental(id, data) {
  const res = await fetch(`${API_URL}/participacionDepartamental/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar participación');
  return res.json();
}

// --- Actividades Especiales ---
export async function getActividadesEspeciales() {
  const res = await fetch(`${API_URL}/actividadesEspeciales`);
  if (!res.ok) throw new Error('Error al obtener actividades especiales');
  return res.json();
}
export async function createActividadEspecial(data) {
  const res = await fetch(`${API_URL}/actividadesEspeciales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear actividad especial');
  return res.json();
}
export async function updateActividadEspecial(id, data) {
  const res = await fetch(`${API_URL}/actividadesEspeciales/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar actividad especial');
  return res.json();
}
export async function deleteActividadEspecial(id) {
  const res = await fetch(`${API_URL}/actividadesEspeciales/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar actividad especial');
  return res.json();
}

// Puedes agregar servicios similares para otras entidades si es necesario.
