const API_URL = '/api/tiendas';

export async function getTiendas() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener tiendas');
  return res.json();
}

export async function createTienda(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear tienda');
  return res.json();
}

export async function deleteTienda(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar tienda');
  return res.json();
}
