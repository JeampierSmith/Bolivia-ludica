const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  obtenerTiendas,
  crearTienda,
  actualizarTienda,
  eliminarTienda
} = require('../controllers/tiendas.controller');

router.get('/', obtenerTiendas);
router.post('/', auth.auth, auth.adminOnly, crearTienda);
router.put('/:id', auth.auth, auth.adminOnly, actualizarTienda);
router.delete('/:id', auth.auth, auth.adminOnly, eliminarTienda);

module.exports = router;
