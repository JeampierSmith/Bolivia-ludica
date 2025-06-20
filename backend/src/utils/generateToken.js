const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;
