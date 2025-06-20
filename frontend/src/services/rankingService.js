const API_URL = '/api/ranking';

export async function getRanking() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener ranking');
  return res.json();
}

export async function createRanking(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear ranking');
  return res.json();
}

export async function deleteRanking(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar ranking');
  return res.json();
}
