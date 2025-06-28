const express = require('express');
const router = express.Router();
const { getEmpresa, updateEmpresa } = require('../controllers/empresa.controller');
const { requireSuperAdmin } = require('../middleware/auth.middleware');

// Obtener datos de la empresa (público)
router.get('/', getEmpresa);
// Actualizar datos de la empresa (solo superadmin)
router.put('/', requireSuperAdmin, updateEmpresa);

module.exports = router;
