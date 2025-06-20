const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// Obtener perfil del usuario autenticado
exports.obtenerPerfil = async (req, res) => {
  const usuario = await Usuario.findById(req.usuario.id).select('-contraseña');
  if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado.' });
  res.json(usuario);
};

// Obtener todos los usuarios (solo admin)
exports.obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find().select('-contraseña');
  res.json(usuarios);
};

// Crear usuario (admin)
exports.crearUsuario = async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  const existe = await Usuario.findOne({ correo });
  if (existe) {
    return res.status(400).json({ msg: 'El correo ya está registrado.' });
  }

  const hash = await bcrypt.hash(contraseña, 10);

  const nuevo = new Usuario({ nombre, correo, contraseña: hash, rol });
  await nuevo.save();

  res.status(201).json({ msg: 'Usuario creado.', usuario: { nombre, correo, rol } });
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Usuario eliminado.' });
};
