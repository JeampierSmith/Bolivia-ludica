const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  obtenerPerfil,
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario
} = require('../controllers/usuarios.controller');

// Usuario autenticado puede ver su perfil
router.get('/perfil', auth.auth, obtenerPerfil);

// Admin puede ver todos los usuarios
router.get('/', auth.auth, auth.adminOnly, obtenerUsuarios);

// Admin puede crear usuarios
router.post('/', auth.auth, auth.adminOnly, crearUsuario);

// Admin puede eliminar usuarios
router.delete('/:id', auth.auth, auth.adminOnly, eliminarUsuario);

module.exports = router;
