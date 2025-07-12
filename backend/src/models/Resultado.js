const mongoose = require('mongoose');

const ResultadoSchema = new mongoose.Schema({
  torneo: { type: mongoose.Schema.Types.ObjectId, ref: 'Torneo', required: true },
  jugador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  puesto: { type: Number, required: true },
  puntosObtenidos: { type: Number, required: true },
  comentario: { type: String }
});

module.exports = mongoose.model('Resultado', ResultadoSchema);
