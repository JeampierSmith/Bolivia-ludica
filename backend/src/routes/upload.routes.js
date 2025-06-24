const express = require('express');
const router = express.Router();
const { uploadProducto, uploadTienda, uploadRanking } = require('../controllers/upload.controller');

router.post('/producto', uploadProducto);
router.post('/tienda', uploadTienda);
router.post('/ranking', uploadRanking);

module.exports = router;
