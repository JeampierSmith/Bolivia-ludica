const mongoose = require('mongoose');

const TorneoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  banner: { type: String },
  participantesPorDepartamento: { type: Map, of: Number, default: {} },
  categorias: [{ type: String }],
  premios: [{ type: String }]
});

module.exports = mongoose.model('Torneo', TorneoSchema);
