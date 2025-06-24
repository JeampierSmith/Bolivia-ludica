const Ranking = require('../models/Ranking');

// Obtener todos los rankings
exports.obtenerRankings = async (req, res) => {
  try {
    // Obtener rankings ordenados por puntos descendente
    const rankings = await Ranking.find().sort({ puntos: -1 });

    // Calcular posición, % victoria y tendencia (dummy)
    const rankingsConExtras = rankings.map((ranking, idx) => {
      const posicionActual = idx + 1;
      const porcentajeVictoria = ranking.partidasJugadas > 0 ? ((ranking.victorias / ranking.partidasJugadas) * 100).toFixed(2) : '0.00';
      // Aquí deberías obtener la posición anterior de algún lado, por ahora null
      const posicionAnterior = null; // O puedes poner 0 si prefieres
      const tendencia = posicionAnterior !== null ? posicionAnterior - posicionActual : null;
      return {
        ...ranking.toObject(),
        posicion: posicionActual,
        porcentajeVictoria,
        tendencia
      };
    });

    res.json(rankingsConExtras);
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

    if (Number(victorias) > Number(partidasJugadas)) {
      return res.status(400).json({ msg: 'El número de victorias no puede ser mayor que el de partidas jugadas' });
    }

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

    if (Number(victorias) > Number(partidasJugadas)) {
      return res.status(400).json({ msg: 'El número de victorias no puede ser mayor que el de partidas jugadas' });
    }

    // Buscar ranking actual para eliminar avatar anterior si cambia y es local
    const rankingActual = await Ranking.findById(req.params.id).lean();
    if (!rankingActual) {
      return res.status(404).json({ msg: 'Ranking no encontrado' });
    }
    if (avatar && avatar !== rankingActual.avatar && rankingActual.avatar && rankingActual.avatar.startsWith('/uploads/')) {
      const path = require('path');
      const fs = require('fs');
      const relativePath = rankingActual.avatar.replace(/^\\|^\//, '');
      const filePath = path.join(__dirname, '../../', relativePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

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
    // Eliminar avatar físico si es un archivo local
    if (ranking.avatar && ranking.avatar.startsWith('/uploads/')) {
      const path = require('path');
      const fs = require('fs');
      const relativePath = ranking.avatar.replace(/^\\|^\//, '');
      const filePath = path.join(__dirname, '../../', relativePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.json({ msg: 'Ranking eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar ranking', error: error.message });
  }
};
