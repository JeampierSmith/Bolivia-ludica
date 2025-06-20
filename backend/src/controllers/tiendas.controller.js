const Tienda = require('../models/Tienda');

exports.obtenerTiendas = async (req, res) => {
  const tiendas = await Tienda.find();
  res.json(tiendas);
};

exports.crearTienda = async (req, res) => {
  try {
    const nueva = new Tienda(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ msg: 'Error al crear tienda', error: err.message });
  }
};

exports.actualizarTienda = async (req, res) => {
  try {
    const tienda = await Tienda.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tienda);
  } catch (err) {
    res.status(400).json({ msg: 'Error al actualizar', error: err.message });
  }
};

exports.eliminarTienda = async (req, res) => {
  await Tienda.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Tienda eliminada' });
};
