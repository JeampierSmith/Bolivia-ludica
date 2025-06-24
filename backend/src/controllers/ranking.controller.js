const Ranking = require('../models/Ranking');

// Obtener todos los rankings
exports.obtenerRankings = async (req, res) => {
  try {
    const rankings = await Ranking.find().sort({ puntos: -1 });
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener rankings', error: error.message });
  }
};

// Obtener un ranking por ID
exports.obtenerRanking = async (req, res) => {
  try {
    const ranking = await Ranking.findById(req.params.id);
    if (!ranking) {
      return res.status(404).json({ msg: 'Ranking no encontrado' });
    }
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener ranking', error: error.message });
  }
};

// Crear nuevo ranking
exports.crearRanking = async (req, res) => {
  try {
    const { jugador, avatar, puntos, partidasJugadas, victorias, nivel, ciudad } = req.body;

    const nuevoRanking = new Ranking({
      jugador,
      avatar,
      puntos: puntos || 0,
      partidasJugadas: partidasJugadas || 0,
      victorias: victorias || 0,
      nivel: nivel || 'Novato',
      ciudad
    });

    await nuevoRanking.save();
    res.status(201).json({ msg: 'Ranking creado correctamente', ranking: nuevoRanking });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear ranking', error: error.message });
  }
};

// Actualizar ranking
exports.actualizarRanking = async (req, res) => {
  try {
    const { jugador, avatar, puntos, partidasJugadas, victorias, nivel, ciudad } = req.body;

    const ranking = await Ranking.findByIdAndUpdate(
      req.params.id,
      {
        jugador,
        avatar,
        puntos,
        partidasJugadas,
        victorias,
        nivel,
        ciudad
      },
      { new: true }
    );

    if (!ranking) {
      return res.status(404).json({ msg: 'Ranking no encontrado' });
    }

    res.json({ msg: 'Ranking actualizado correctamente', ranking });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar ranking', error: error.message });
  }
};

// Eliminar ranking
exports.eliminarRanking = async (req, res) => {
  try {
    const ranking = await Ranking.findByIdAndDelete(req.params.id);
    
    if (!ranking) {
      return res.status(404).json({ msg: 'Ranking no encontrado' });
    }

    res.json({ msg: 'Ranking eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar ranking', error: error.message });
  }
};
