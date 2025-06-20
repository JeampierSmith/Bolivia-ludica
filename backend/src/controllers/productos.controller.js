const Producto = require('../models/Producto');

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
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Producto eliminado' });
};
