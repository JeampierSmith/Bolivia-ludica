const Usuario = require('../models/Usuario');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken');

exports.registro = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    // ✅ Verificación manual de unicidad
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ msg: 'El correo ya está registrado.' });
    }

    // ✅ Encriptar contraseña
    const hashedPassword = await hashPassword(contraseña);

    // ✅ Crear nuevo usuario (permitir rol si se envía y es válido)
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña: hashedPassword,
      rol: rol === 'admin' ? 'admin' : 'cliente'
    });

    await nuevoUsuario.save();

    res.status(201).json({ msg: 'Usuario registrado correctamente.' });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el registro.', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado.' });
    }

    const esValida = await comparePassword(contraseña, usuario.contraseña);
    if (!esValida) {
      return res.status(401).json({ msg: 'Contraseña incorrecta.' });
    }

    const token = generateToken(usuario);

    res.json({
      msg: 'Login exitoso.',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el login.', error: error.message });
  }
};
