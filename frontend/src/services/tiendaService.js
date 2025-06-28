const API_URL = import.meta.env.VITE_API_URL + '/tiendas';
const DEPT_API_URL = import.meta.env.VITE_API_URL + '/departamentos';

export async function getTiendas() {
  const res = await fetch(API_URL, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al obtener tiendas');
  return res.json();
}

export async function createTienda(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  let errorMsg = 'Error al crear tienda';
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

export async function deleteTienda(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al eliminar tienda');
  return res.json();
}

export async function updateTienda(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar tienda');
  return res.json();
}

export async function getDepartamentos() {
  const res = await fetch(DEPT_API_URL, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al obtener departamentos');
  return res.json();
}

export async function createDepartamento(nombre) {
  const res = await fetch(DEPT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre })
  });
  if (!res.ok) throw new Error('Error al crear departamento');
  return res.json();
}
