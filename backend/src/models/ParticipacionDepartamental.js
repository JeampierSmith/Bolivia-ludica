const mongoose = require('mongoose');

const ParticipacionDepartamentalSchema = new mongoose.Schema({
  eventoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento', required: true },
  departamento: { type: String, required: true },
  cantidad: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('ParticipacionDepartamental', ParticipacionDepartamentalSchema);
