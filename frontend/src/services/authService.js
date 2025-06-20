const API_URL = '/api/auth';

export async function login({ correo, contraseña }) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, contraseña })
  });
  if (!res.ok) throw new Error('Error al iniciar sesión');
  return res.json();
}

export async function register(data) {
  const res = await fetch(`${API_URL}/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al registrar usuario');
  return res.json();
}
