const Pedido = require('../models/Pedido');

exports.obtenerPedidos = async (req, res) => {
  const pedidos = await Pedido.find()
    .populate('usuario', 'nombre correo')
    .populate('productos.producto', 'nombre precio');
  res.json(pedidos);
};

exports.crearPedido = async (req, res) => {
  try {
    const nuevo = new Pedido({ ...req.body, usuario: req.usuario.id });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ msg: 'Error al crear pedido', error: err.message });
  }
};

exports.actualizarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pedido) return res.status(404).json({ msg: 'Pedido no encontrado' });
    res.json(pedido);
  } catch (err) {
    res.status(400).json({ msg: 'Error al actualizar pedido', error: err.message });
  }
};

exports.eliminarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ msg: 'Pedido no encontrado' });
    await Pedido.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Pedido eliminado' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar pedido', error: err.message });
  }
};
