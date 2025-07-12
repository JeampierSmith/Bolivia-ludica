const API_URL = import.meta.env.VITE_API_URL + '/participacionDepartamental';

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

export async function getParticipaciones() {
  const res = await fetch(API_URL, { credentials: 'include' });
  return handleResponse(res, 'Error al obtener participaciones');
}

export async function createParticipacion(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res, 'Error al crear participación');
}

export async function updateParticipacion(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res, 'Error al actualizar participación');
}

export async function deleteParticipacion(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  return handleResponse(res, 'Error al eliminar participación');
}
