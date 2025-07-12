const API_URL = import.meta.env.VITE_API_URL + '/eventos';

async function handleResponse(res, defaultErrorMsg) {
  let errorBody = null;
  try { errorBody = await res.json(); } catch {}
  if (!res.ok) {
    let errorMsg = defaultErrorMsg;
    if (errorBody && errorBody.error) errorMsg += ': ' + errorBody.error;
    throw new Error(errorMsg);
  }
  return errorBody;
}

export async function getEventos() {
  const res = await fetch(API_URL, { credentials: 'include' });
  return handleResponse(res, 'Error al obtener eventos');
}

export async function createEvento(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res, 'Error al crear evento');
}

export async function updateEvento(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res, 'Error al actualizar evento');
}

export async function deleteEvento(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  return handleResponse(res, 'Error al eliminar evento');
}
