const Empresa = require('../models/Empresa');

// Obtener datos de la empresa
exports.getEmpresa = async (req, res) => {
  try {
    let empresa = await Empresa.findOne();
    if (!empresa) {
      // Si no existe, crea un registro base con datos iniciales
      empresa = await Empresa.create({
        nombre: 'Bolivia Lúdica',
        telefono: '',
        correo: '',
        direccion: '',
        mensaje: '',
      });
    }
    res.json(empresa);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener datos de la empresa', error: err.message });
  }
};

// Actualizar datos de la empresa (solo superadmin)
exports.updateEmpresa = async (req, res) => {
  try {
    let empresa = await Empresa.findOne();
    if (!empresa) {
      empresa = await Empresa.create({
        nombre: 'Bolivia Lúdica',
        telefono: '',
        correo: '',
        direccion: '',
        mensaje: '',
      });
    }
    Object.assign(empresa, req.body);
    await empresa.save();
    res.json(empresa);
  } catch (err) {
    res.status(500).json({ msg: 'Error al actualizar datos de la empresa', error: err.message });
  }
};
