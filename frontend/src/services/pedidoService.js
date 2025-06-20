const API_URL = '/api/pedidos';

export async function getPedidos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener pedidos');
  return res.json();
}

export async function createPedido(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear pedido');
  return res.json();
}

export async function deletePedido(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar pedido');
  return res.json();
}
