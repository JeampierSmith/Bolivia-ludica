const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos.controller');

router.get('/', obtenerProductos);
router.post('/', auth.auth, auth.requireRole('admin', 'superadmin'), upload.single('imagen'), crearProducto);
router.put('/:id', auth.auth, auth.requireRole('admin', 'superadmin'), upload.single('imagen'), actualizarProducto);
router.delete('/:id', auth.auth, auth.requireRole('admin', 'superadmin'), eliminarProducto);

module.exports = router;
