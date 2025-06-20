const mongoose = require('mongoose');

const tiendaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true }, // Ciudad / departamento
  especialidad: { type: String },
  logo: { type: String }, // Ruta o URL al logo
  descripcion: { type: String },
  redesSociales: {
    facebook: { type: String },
    instagram: { type: String },
    sitioWeb: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Tienda', tiendaSchema);
