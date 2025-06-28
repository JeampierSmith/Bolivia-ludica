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

// Middleware para clientes (token en cookie bludica_cliente)
exports.requireCliente = (req, res, next) => {
  const token = req.cookies?.bludica_cliente;
  if (!token) return res.status(403).json({ msg: 'Token de cliente requerido' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.rol !== 'cliente') return res.status(403).json({ msg: 'Acceso solo para clientes' });
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};

// Middleware para admin/superadmin (token en cookie bludica_admin)
exports.requireAdmin = (req, res, next) => {
  const token = req.cookies?.bludica_admin;
  console.log('Middleware requireAdmin: cookie bludica_admin:', token);
  if (!token) return res.status(403).json({ msg: 'Token de admin requerido' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Middleware requireAdmin: payload decodificado:', decoded);
    if (decoded.rol !== 'admin' && decoded.rol !== 'superadmin') {
      console.log('Middleware requireAdmin: rol inválido:', decoded.rol);
      return res.status(403).json({ msg: 'Acceso solo para administradores' });
    }
    req.usuario = decoded;
    next();
  } catch (err) {
    console.log('Middleware requireAdmin: error al verificar token:', err);
    res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};

// Middleware solo para superadmin (token en cookie bludica_admin)
exports.requireSuperAdmin = (req, res, next) => {
  const token = req.cookies?.bludica_admin;
  if (!token) return res.status(403).json({ msg: 'Token de admin requerido' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.rol !== 'superadmin') return res.status(403).json({ msg: 'Acceso solo para superadministradores' });
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};
