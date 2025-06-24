const mongoose = require('mongoose');

const tiendaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true }, // Ciudad / departamento
  logo: { type: String }, // Ruta o URL al logo
  descripcion: { type: String },
  direccion: { type: String },
  ambiente: [{ type: String }], // imágenes del ambiente
  telefono: { type: String },
  correo: { type: String },
  horarios: { type: String },
  tiktok: { type: String },
  redesSociales: {
    facebook: { type: String },
    instagram: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Tienda', tiendaSchema);
