const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { requireSuperAdmin, requireCliente } = require('../middleware/auth.middleware');
const {
  obtenerPerfil,
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  editarUsuario
} = require('../controllers/usuarios.controller');

// Registro público de clientes
router.post('/registro', async (req, res) => {
  // Solo permite rol cliente
  req.body.rol = 'cliente';
  // Llama directamente a la función importada crearUsuario
  await crearUsuario(req, res);
});

// Cliente autenticado puede ver su perfil
router.get('/perfil', auth.requireCliente, obtenerPerfil);

// Solo superadmin puede ver, crear, eliminar y editar usuarios
router.get('/', auth.requireSuperAdmin, obtenerUsuarios);
router.post('/', auth.requireSuperAdmin, crearUsuario);
router.delete('/:id', auth.requireSuperAdmin, eliminarUsuario);
router.patch('/:id/rol', auth.requireSuperAdmin, editarUsuario);

module.exports = router;
