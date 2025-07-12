const API_URL = import.meta.env.VITE_API_URL + '/actividadesEspeciales';

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

export async function getActividades() {
  const res = await fetch(API_URL, { credentials: 'include' });
  return handleResponse(res, 'Error al obtener actividades');
}

export async function createActividad(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res, 'Error al crear actividad');
}

export async function updateActividad(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res, 'Error al actualizar actividad');
}

export async function deleteActividad(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  return handleResponse(res, 'Error al eliminar actividad');
}
