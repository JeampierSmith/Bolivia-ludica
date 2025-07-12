const Evento = require('../models/Evento');

exports.getEventos = async (req, res) => {
  const eventos = await Evento.find().sort({ fecha: -1 });
  res.json(eventos);
};

exports.getEvento = async (req, res) => {
  const evento = await Evento.findById(req.params.id);
  if (!evento) return res.status(404).json({ error: 'No encontrado' });
  res.json(evento);
};

exports.createEvento = async (req, res) => {
  const evento = new Evento(req.body);
  await evento.save();
  res.status(201).json(evento);
};

exports.updateEvento = async (req, res) => {
  const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!evento) return res.status(404).json({ error: 'No encontrado' });
  res.json(evento);
};

exports.deleteEvento = async (req, res) => {
  const evento = await Evento.findByIdAndDelete(req.params.id);
  if (!evento) return res.status(404).json({ error: 'No encontrado' });
  res.json({ message: 'Eliminado' });
};
