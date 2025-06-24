const express = require('express');
const router = express.Router();
const { 
  obtenerRankings, 
  obtenerRanking, 
  crearRanking, 
  actualizarRanking, 
  eliminarRanking 
} = require('../controllers/ranking.controller');

// Rutas para rankings
router.get('/', obtenerRankings);
router.get('/:id', obtenerRanking);
router.post('/', crearRanking);
router.put('/:id', actualizarRanking);
router.delete('/:id', eliminarRanking);

module.exports = router;
