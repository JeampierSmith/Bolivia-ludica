const express = require('express');
const router = express.Router();
const { getEmpresa, updateEmpresa } = require('../controllers/empresa.controller');
const { requireSuperAdmin, requireAdmin } = require('../middleware/auth.middleware');

// Obtener datos de la empresa (admin o superadmin)
router.get('/', requireAdmin, getEmpresa);
// Actualizar datos de la empresa (solo superadmin)
router.put('/', requireSuperAdmin, updateEmpresa);

module.exports = router;
