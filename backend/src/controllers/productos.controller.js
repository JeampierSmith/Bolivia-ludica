const Producto = require('../models/Producto');
const fs = require('fs');
const path = require('path');

exports.obtenerProductos = async (req, res) => {
  const productos = await Producto.find(); // Ya no se hace populate
  res.json(productos);
};

exports.crearProducto = async (req, res) => {
  try {
    const nuevo = new Producto(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ msg: 'Error al crear producto', error: err.message });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(producto);
  } catch (err) {
    res.status(400).json({ msg: 'Error al actualizar', error: err.message });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
    // Eliminar imágenes físicas
    if (producto.imagenes && producto.imagenes.length > 0) {
      producto.imagenes.forEach(imgPath => {
        if (imgPath.startsWith('/uploads/')) {
          const relativePath = imgPath.replace(/^\\|^\//, '');
          const filePath = path.join(__dirname, '../../', relativePath);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      });
    }
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar producto', error: err.message });
  }
};
