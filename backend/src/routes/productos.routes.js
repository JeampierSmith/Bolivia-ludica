const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos.controller');

router.get('/', obtenerProductos);
router.post('/', auth.auth, auth.adminOnly, crearProducto);
router.put('/:id', auth.auth, auth.adminOnly, actualizarProducto);
router.delete('/:id', auth.auth, auth.adminOnly, eliminarProducto);

module.exports = router;
