const API_URL = import.meta.env.VITE_API_URL + '/upload';

export async function uploadProductoImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/producto`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Error al subir imagen de producto');
  return res.json();
}

export async function uploadTiendaLogo(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/tienda`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Error al subir logo de tienda');
  return res.json();
}
