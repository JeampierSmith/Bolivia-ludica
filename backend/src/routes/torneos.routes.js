const express = require('express');
const router = express.Router();
const torneosCtrl = require('../controllers/torneos.controller');
const authAdmin = require('../middleware/authAdmin');

router.post('/', authAdmin, torneosCtrl.crearTorneo);
router.get('/', torneosCtrl.obtenerTorneos);
router.put('/:id', authAdmin, torneosCtrl.actualizarTorneo);
router.delete('/:id', authAdmin, torneosCtrl.eliminarTorneo);

module.exports = router;
