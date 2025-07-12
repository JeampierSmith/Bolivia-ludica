const Actividad = require('../models/ActividadEspecial');
const Evento = require('../models/Evento');

exports.getActividades = async (req, res) => {
  const actividades = await Actividad.find();
  res.json(actividades);
};

exports.getActividad = async (req, res) => {
  const actividad = await Actividad.findById(req.params.id);
  if (!actividad) return res.status(404).json({ error: 'No encontrado' });
  res.json(actividad);
};

exports.createActividad = async (req, res) => {
  const { eventoId } = req.body;
  // Validar que el evento exista
  const evento = await Evento.findById(eventoId);
  if (!evento) return res.status(400).json({ error: 'Evento no válido' });
  const actividad = new Actividad(req.body);
  await actividad.save();
  res.status(201).json(actividad);
};

exports.updateActividad = async (req, res) => {
  const actividad = await Actividad.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!actividad) return res.status(404).json({ error: 'No encontrado' });
  res.json(actividad);
};

exports.deleteActividad = async (req, res) => {
  const actividad = await Actividad.findByIdAndDelete(req.params.id);
  if (!actividad) return res.status(404).json({ error: 'No encontrado' });
  res.json({ message: 'Eliminado' });
};
