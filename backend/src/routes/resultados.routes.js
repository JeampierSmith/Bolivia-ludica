const express = require('express');
const router = express.Router();
const resultadosCtrl = require('../controllers/resultados.controller');
const authAdmin = require('../middleware/authAdmin');

router.post('/', authAdmin, resultadosCtrl.crearResultado);
router.get('/torneo/:torneoId', resultadosCtrl.obtenerResultadosPorTorneo);
router.get('/podio/:torneoId', resultadosCtrl.obtenerPodioTop3);

module.exports = router;
