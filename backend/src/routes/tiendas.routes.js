const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const {
  obtenerTiendas,
  crearTienda,
  actualizarTienda,
  eliminarTienda
} = require('../controllers/tiendas.controller');

router.get('/', obtenerTiendas);
router.post('/', auth.auth, auth.requireAdminOrSuperAdmin, upload.single('imagen'), crearTienda);
router.put('/:id', auth.auth, auth.requireAdminOrSuperAdmin, upload.single('imagen'), actualizarTienda);
router.delete('/:id', auth.auth, auth.requireAdminOrSuperAdmin, eliminarTienda);

module.exports = router;
