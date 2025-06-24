const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Permite formato 'Bearer <token>' o solo el token
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;
  if (!token) return res.status(403).json({ msg: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.usuario?.rol !== 'admin') {
    return res.status(403).json({ msg: 'Acceso restringido solo para administradores' });
  }
  next();
};

exports.requireRole = (...roles) => (req, res, next) => {
  if (!req.usuario || !roles.includes(req.usuario.rol)) {
    return res.status(403).json({ msg: 'Acceso restringido: se requiere uno de los siguientes roles: ' + roles.join(', ') });
  }
  next();
};

// Middleware para requerir superadmin
exports.requireSuperAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== 'superadmin') {
    return res.status(403).json({ msg: 'Acceso restringido solo para superadministradores' });
  }
  next();
};

// Middleware para requerir admin o superadmin
exports.requireAdminOrSuperAdmin = (req, res, next) => {
  if (!req.usuario || (req.usuario.rol !== 'admin' && req.usuario.rol !== 'superadmin')) {
    return res.status(403).json({ msg: 'Acceso restringido solo para administradores o superadministradores' });
  }
  next();
};
