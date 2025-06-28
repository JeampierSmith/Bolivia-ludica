const API_URL = import.meta.env.VITE_API_URL + '/productos';

export async function getProductos() {
  const res = await fetch(API_URL, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export async function createProducto(data) {
  // Siempre enviar JSON, nunca FormData aquí
  const headers = {
    'Content-Type': 'application/json',
  };
  // Asegura que imagenes sea array de string
  const body = JSON.stringify({
    ...data,
    imagenes: Array.isArray(data.imagenes) ? data.imagenes : (data.imagenes ? [data.imagenes] : [])
  });
  const res = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
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
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al eliminar producto');
  return res.json();
}

export async function updateProducto(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      imagenes: Array.isArray(data.imagenes) ? data.imagenes : (data.imagenes ? [data.imagenes] : [])
    })
  });
  if (!res.ok) throw new Error('Error al actualizar producto');
  return res.json();
}
