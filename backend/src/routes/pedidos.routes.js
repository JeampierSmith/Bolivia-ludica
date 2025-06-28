const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { obtenerPedidos, crearPedido, actualizarPedido, eliminarPedido } = require('../controllers/pedidos.controller');

// Admin o superadmin pueden hacer CRUD completo
router.get('/', auth.requireAdmin, obtenerPedidos);
router.post('/', auth.requireAdmin, crearPedido);
router.put('/:id', auth.requireAdmin, actualizarPedido);
router.delete('/:id', auth.requireAdmin, eliminarPedido);

// Cliente puede crear y leer pedidos desde la tienda
router.get('/tienda', auth.requireCliente, obtenerPedidos); // GET /api/pedidos/tienda
router.post('/tienda', auth.requireCliente, crearPedido);  // POST /api/pedidos/tienda

module.exports = router;
