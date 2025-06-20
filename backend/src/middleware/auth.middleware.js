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
