import { getToken } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL + '/productos';

export async function getProductos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export async function createProducto(data) {
  const token = getToken();
  // Siempre enviar JSON, nunca FormData aquí
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  // Asegura que imagenes sea array de string
  const body = JSON.stringify({
    ...data,
    imagenes: Array.isArray(data.imagenes) ? data.imagenes : (data.imagenes ? [data.imagenes] : [])
  });
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body
  });
  let errorMsg = 'Error al crear producto';
  let errorBody = null;
  try {
    errorBody = await res.json();
  } catch {}
  if (!res.ok) {
    if (errorBody && errorBody.error) errorMsg += ': ' + errorBody.error;
    throw new Error(errorMsg);
  }
  return errorBody;
}

export async function deleteProducto(id) {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Error al eliminar producto');
  return res.json();
}

export async function updateProducto(id, data) {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({
      ...data,
      imagenes: Array.isArray(data.imagenes) ? data.imagenes : (data.imagenes ? [data.imagenes] : [])
    })
  });
  if (!res.ok) throw new Error('Error al actualizar producto');
  return res.json();
}
