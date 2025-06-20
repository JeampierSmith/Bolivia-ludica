const express = require('express');
const router = express.Router();
const { uploadProducto, uploadTienda } = require('../controllers/upload.controller');

router.post('/producto', uploadProducto);
router.post('/tienda', uploadTienda);

module.exports = router;
