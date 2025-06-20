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
