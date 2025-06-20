const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { obtenerRanking, crearRegistroRanking, eliminarRanking } = require('../controllers/ranking.controller');

router.get('/', obtenerRanking);
router.post('/', auth.auth, auth.adminOnly, crearRegistroRanking);
router.delete('/:id', auth.auth, auth.adminOnly, eliminarRanking);

module.exports = router;
