const mongoose = require('mongoose');

const ActividadEspecialSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  descripcion: { type: String },
  icono: { type: String }, // emoji o clase
  estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
  eventoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento', required: true }
}, { timestamps: true });

module.exports = mongoose.model('ActividadEspecial', ActividadEspecialSchema);
