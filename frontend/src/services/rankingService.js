const API_URL = import.meta.env.VITE_API_URL + '/ranking';

export async function getRankings() {
  const res = await fetch(API_URL, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al obtener rankings');
  return res.json();
}

export async function createRanking(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  let errorMsg = 'Error al crear ranking';
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

export async function updateRanking(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  let errorMsg = 'Error al actualizar ranking';
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

export async function deleteRanking(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al eliminar ranking');
  return res.json();
}
