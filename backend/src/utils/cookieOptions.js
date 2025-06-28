// Opciones de cookies seguras para HttpOnly JWT
module.exports = {
  cliente: {
    httpOnly: true,
    secure: false, // Cambia a true en producción con HTTPS
    sameSite: 'lax', // Cambiado de 'strict' a 'lax'
    path: '/api/tiendas',
    maxAge: 60 * 60 * 24 * 7 * 1000 // 7 días
  },
  admin: {
    httpOnly: true,
    secure: false, // Cambia a true en producción con HTTPS
    sameSite: 'lax', // Cambiado de 'strict' a 'lax'
    path: '/api',
    maxAge: 60 * 60 * 24 * 7 * 1000 // 7 días
  }
};
