const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { obtenerPedidos, crearPedido, actualizarPedido, eliminarPedido } = require('../controllers/pedidos.controller');

// Cambiado: permite admin o superadmin ver, editar y eliminar pedidos
router.get('/', auth.auth, auth.requireAdminOrSuperAdmin, obtenerPedidos);
router.post('/', auth.auth, crearPedido); // Clientes pueden crear pedido
router.put('/:id', auth.auth, auth.requireAdminOrSuperAdmin, actualizarPedido);
router.delete('/:id', auth.auth, auth.requireAdminOrSuperAdmin, eliminarPedido);

module.exports = router;
