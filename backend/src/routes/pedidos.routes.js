const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { obtenerPedidos, crearPedido } = require('../controllers/pedidos.controller');

router.get('/', auth.auth, auth.adminOnly, obtenerPedidos);
router.post('/', auth.auth, crearPedido); // Clientes pueden crear pedido

module.exports = router;
