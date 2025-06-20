const Ranking = require('../models/Ranking');

exports.obtenerRanking = async (req, res) => {
  const ranking = await Ranking.find()
    .sort({ puntos: -1 })
    .populate('jugador', 'nombre correo rol');
  res.json(ranking);
};

exports.crearRegistroRanking = async (req, res) => {
  try {
    const registro = new Ranking(req.body);
    await registro.save();
    res.status(201).json(registro);
  } catch (err) {
    res.status(400).json({ msg: 'Error al registrar', error: err.message });
  }
};

exports.eliminarRanking = async (req, res) => {
  await Ranking.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Registro eliminado' });
};
