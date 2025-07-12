const Participacion = require('../models/ParticipacionDepartamental');
const Evento = require('../models/Evento');

exports.getParticipaciones = async (req, res) => {
  const participaciones = await Participacion.find();
  res.json(participaciones);
};

exports.getParticipacion = async (req, res) => {
  const participacion = await Participacion.findById(req.params.id);
  if (!participacion) return res.status(404).json({ error: 'No encontrado' });
  res.json(participacion);
};

exports.createParticipacion = async (req, res) => {
  const { eventoId, departamento, cantidad } = req.body;
  // Validar que el evento exista
  const evento = await Evento.findById(eventoId);
  if (!evento) return res.status(400).json({ error: 'Evento no válido' });
  const participacion = new Participacion({ eventoId, departamento, cantidad });
  await participacion.save();
  res.status(201).json(participacion);
};

exports.updateParticipacion = async (req, res) => {
  const participacion = await Participacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!participacion) return res.status(404).json({ error: 'No encontrado' });
  res.json(participacion);
};

exports.deleteParticipacion = async (req, res) => {
  const participacion = await Participacion.findByIdAndDelete(req.params.id);
  if (!participacion) return res.status(404).json({ error: 'No encontrado' });
  res.json({ message: 'Eliminado' });
};
