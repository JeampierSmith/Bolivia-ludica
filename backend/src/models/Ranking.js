const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
  jugador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  puntos: { type: Number, default: 0 },
  partidasJugadas: { type: Number, default: 0 },
  nivel: { 
    type: String, 
    enum: ['Novato', 'Intermedio', 'Avanzado', 'Experto'], 
    default: 'Novato' 
  },
  ciudad: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Ranking', rankingSchema);
