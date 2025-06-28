// Middleware para permitir solo admin o superadmin
function soloAdmin(req, res, next) {
  if (!req.usuario || (req.usuario.rol !== 'admin' && req.usuario.rol !== 'superadmin')) {
    return res.status(403).json({ mensaje: 'Acceso denegado: solo administradores.' });
  }
  next();
}

module.exports = soloAdmin;
