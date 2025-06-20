const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  imagenes: [{ type: String }], // URLs o rutas relativas
  stock: { type: Number, default: 0 },
  categoria: { type: String, enum: ['Juegos de Mesa', 'Cartas TCG', 'Accesorios', 'Ropa', 'Otros'], default: 'Otros' }
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);
