const Departamento = require('../models/Departamento');

exports.obtenerDepartamentos = async (req, res) => {
  const departamentos = await Departamento.find().sort({ nombre: 1 });
  res.json(departamentos);
};

exports.crearDepartamento = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ msg: 'Nombre requerido' });
    // Evitar duplicados (case insensitive)
    const existe = await Departamento.findOne({ nombre: { $regex: `^${nombre}$`, $options: 'i' } });
    if (existe) return res.status(409).json({ msg: 'El departamento ya existe' });
    const nuevo = new Departamento({ nombre });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ msg: 'Error al crear departamento', error: err.message });
  }
}; 