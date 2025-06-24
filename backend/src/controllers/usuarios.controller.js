const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// Obtener perfil del usuario autenticado
exports.obtenerPerfil = async (req, res) => {
  const usuario = await Usuario.findById(req.usuario.id).select('-contraseña');
  if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado.' });
  res.json(usuario);
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  // Si es admin, solo puede ver clientes. Si es superadmin, ve todos.
  let query = {};
  if (req.usuario.rol === 'admin') {
    query.rol = 'cliente';
  }
  const usuarios = await Usuario.find(query).select('-contraseña');
  res.json(usuarios);
};

// Crear usuario
exports.crearUsuario = async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  // Solo superadmin puede crear admin o superadmin
  if ((rol === 'admin' || rol === 'superadmin') && req.usuario.rol !== 'superadmin') {
    return res.status(403).json({ msg: 'Solo el superadmin puede crear usuarios admin o superadmin.' });
  }

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
  // Solo superadmin puede eliminar admin o superadmin
  const usuarioAEliminar = await Usuario.findById(req.params.id);
  if (!usuarioAEliminar) return res.status(404).json({ msg: 'Usuario no encontrado.' });
  if ((usuarioAEliminar.rol === 'admin' || usuarioAEliminar.rol === 'superadmin') && req.usuario.rol !== 'superadmin') {
    return res.status(403).json({ msg: 'Solo el superadmin puede eliminar usuarios admin o superadmin.' });
  }
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Usuario eliminado.' });
};

// Editar usuario (admin puede editar clientes, superadmin puede editar todos)
exports.editarUsuario = async (req, res) => {
  try {
    // Solo superadmin puede editar admin o superadmin
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado.' });
    if ((usuario.rol === 'admin' || usuario.rol === 'superadmin') && req.usuario.rol !== 'superadmin') {
      return res.status(403).json({ msg: 'Solo el superadmin puede editar usuarios admin o superadmin.' });
    }
    // Si se envía contraseña, hashearla
    if (req.body.contraseña) {
      req.body.contraseña = await bcrypt.hash(req.body.contraseña, 10);
    }
    // Actualizar usuario y devolver el nuevo
    const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ msg: 'Error al actualizar usuario', error: err.message });
  }
};
