const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: {
    type: String,
    enum: ['cliente', 'admin'],
    default: 'cliente'
  },
  direccion: { type: String },
  telefono: { type: String }
}, { timestamps: true });



module.exports = mongoose.model('Usuario', usuarioSchema);
