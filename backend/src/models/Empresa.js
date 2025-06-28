const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
  nombre: { type: String, default: '' },
  telefono: { type: String, default: '' },
  correo: { type: String, default: '' },
  direccion: { type: String, default: '' },
  mensaje: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Empresa', empresaSchema);
