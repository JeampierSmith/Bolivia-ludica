const Torneo = require('../models/Torneo');

exports.crearTorneo = async (req, res) => {
  try {
    const torneo = new Torneo(req.body);
    await torneo.save();
    res.status(201).json(torneo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.obtenerTorneos = async (req, res) => {
  try {
    const torneos = await Torneo.find();
    res.json(torneos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizarTorneo = async (req, res) => {
  try {
    const torneo = await Torneo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(torneo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminarTorneo = async (req, res) => {
  try {
    await Torneo.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Torneo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
