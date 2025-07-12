const Resultado = require('../models/Resultado');
const Ranking = require('../models/Ranking');

exports.crearResultado = async (req, res) => {
  try {
    const resultado = new Resultado(req.body);
    await resultado.save();

    // Actualizar puntos en el ranking del jugador
    await Ranking.findOneAndUpdate(
      { jugador: resultado.jugador },
      { $inc: { puntos: resultado.puntosObtenidos } },
      { upsert: true }
    );

    res.status(201).json(resultado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.obtenerResultadosPorTorneo = async (req, res) => {
  try {
    const resultados = await Resultado.find({ torneo: req.params.torneoId })
      .populate('jugador')
      .populate('torneo');
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerPodioTop3 = async (req, res) => {
  try {
    const podio = await Resultado.find({ torneo: req.params.torneoId })
      .sort({ puesto: 1 })
      .limit(3)
      .populate('jugador')
      .populate('torneo');
    res.json(podio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
