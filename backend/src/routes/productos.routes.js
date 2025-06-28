const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos.controller');

router.get('/', obtenerProductos);
router.post('/', auth.requireAdmin, upload.single('imagen'), crearProducto);
router.put('/:id', auth.requireAdmin, upload.single('imagen'), actualizarProducto);
router.delete('/:id', auth.requireAdmin, eliminarProducto);

module.exports = router;
