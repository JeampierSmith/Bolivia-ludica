import { getToken } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL + '/usuarios';

export async function getUsuarios() {
  const token = getToken();
  const res = await fetch(API_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
}

export async function createUsuario(data) {
  const token = getToken();
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data)
  });
  let errorMsg = 'Error al crear usuario';
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

export async function updateUsuario(id, data) {
  const token = getToken();

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar usuario');
  return res.json();
}

export async function deleteUsuario(id) {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Error al eliminar usuario');
  return res.json();
}

export async function getUsuarioById(id) {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) {
    let msg = 'Error al obtener usuario';
    try {
      const errorBody = await res.json();
      if (errorBody && errorBody.msg) msg += ': ' + errorBody.msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}
