const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
  jugador: { type: String, required: true },
  avatar: { type: String },
  puntos: { type: Number, default: 0 },
  partidasJugadas: { type: Number, default: 0 },
  victorias: { type: Number, default: 0 },
  nivel: { 
    type: String, 
    enum: ['Novato', 'Intermedio', 'Avanzado', 'Experto'], 
    default: 'Novato' 
  },
  ciudad: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Ranking', rankingSchema);
