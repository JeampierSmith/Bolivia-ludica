const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { requireRole, requireSuperAdmin, requireAdminOrSuperAdmin } = require('../middleware/auth.middleware');
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

// Usuario autenticado puede ver su perfil
router.get('/perfil', auth.auth, obtenerPerfil);

// Admin puede ver solo clientes, superadmin ve todos
router.get('/', auth.auth, requireAdminOrSuperAdmin, obtenerUsuarios);

// Solo superadmin puede crear usuarios admin o superadmin, admin puede crear clientes (la lógica está en el controlador)
router.post('/', auth.auth, requireAdminOrSuperAdmin, crearUsuario);

// Solo superadmin puede eliminar admin/superadmin, admin puede eliminar clientes (la lógica está en el controlador)
router.delete('/:id', auth.auth, requireAdminOrSuperAdmin, eliminarUsuario);

// Solo superadmin puede cambiar el rol de un usuario
router.patch('/:id/rol', auth.auth, requireSuperAdmin, async (req, res) => {
  const { rol } = req.body;
  if (!['cliente', 'admin', 'superadmin'].includes(rol)) {
    return res.status(400).json({ msg: 'Rol no válido' });
  }
  const usuario = await require('../models/Usuario').findByIdAndUpdate(req.params.id, { rol }, { new: true });
  if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
  res.json({ msg: 'Rol actualizado', usuario });
});

// Editar usuario (admin puede editar clientes, superadmin puede editar todos)
router.put('/:id', auth.auth, requireAdminOrSuperAdmin, editarUsuario);

// Obtener usuario por ID (admin o superadmin)
router.get('/:id', auth.auth, requireAdminOrSuperAdmin, async (req, res) => {
  try {
    const usuario = await require('../models/Usuario').findById(req.params.id).select('-contraseña');
    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ msg: 'Error al obtener usuario', error: err.message });
  }
});

module.exports = router;
