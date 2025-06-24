console.log('Cargando departamentos.routes.js');
const express = require('express');
const router = express.Router();
const { obtenerDepartamentos, crearDepartamento } = require('../controllers/departamentos.controller');

router.get('/', obtenerDepartamentos);
router.post('/', crearDepartamento);

module.exports = router; 