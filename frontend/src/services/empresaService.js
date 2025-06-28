const API_URL = import.meta.env.VITE_API_URL || '';

export async function getEmpresa() {
  const res = await fetch(`${API_URL}/empresa`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('No se pudo obtener los datos de la empresa');
  return await res.json();
}

export async function updateEmpresa(data) {
  const res = await fetch(`${API_URL}/empresa`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('No se pudo actualizar los datos de la empresa');
  return await res.json();
}
