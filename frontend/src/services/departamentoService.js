import { getToken } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL + '/departamentos';

export async function getDepartamentos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener departamentos');
  return res.json();
}

export async function createDepartamento(nombre) {
  const token = getToken();
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ nombre })
  });
  let errorMsg = 'Error al crear departamento';
  let errorBody = null;
  try {
    errorBody = await res.json();
  } catch {}
  if (!res.ok) {
    if (errorBody && errorBody.msg) errorMsg += ': ' + errorBody.msg;
    throw new Error(errorMsg);
  }
  return errorBody;
}

