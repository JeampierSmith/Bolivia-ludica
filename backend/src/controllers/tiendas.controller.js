const Tienda = require('../models/Tienda');
const fs = require('fs');
const path = require('path');

exports.obtenerTiendas = async (req, res) => {
  const tiendas = await Tienda.find();
  res.json(tiendas);
};

exports.crearTienda = async (req, res) => {
  try {
    let data = req.body;
    // Si el frontend envía logo como string (URL), úsalo directamente
    // Si hay ambiente como string, conviértelo a array
    if (data.ambiente && typeof data.ambiente === 'string') {
      data.ambiente = [data.ambiente];
    }
    const nueva = new Tienda(data);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ msg: 'Error al crear tienda', error: err.message });
  }
};

exports.actualizarTienda = async (req, res) => {
  try {
    const data = req.body;
    if (data.ambiente && typeof data.ambiente === 'string') {
      data.ambiente = [data.ambiente];
    }
    const tiendaActual = await Tienda.findById(req.params.id).lean();
    if (!tiendaActual) {
      return res.status(404).json({ msg: 'Tienda no encontrada' });
    }
    // Eliminar logo anterior si se sube uno nuevo y es local
    if (data.logo && data.logo !== tiendaActual.logo && tiendaActual.logo && tiendaActual.logo.startsWith('/uploads/')) {
      const relativePath = tiendaActual.logo.replace(/^\\|^\//, '');
      const filePath = path.join(__dirname, '../../', relativePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    // Eliminar imágenes de ambiente anteriores que ya no estén en el nuevo array
    if (Array.isArray(tiendaActual.ambiente)) {
      tiendaActual.ambiente.forEach(imgPath => {
        if (
          imgPath &&
          imgPath.startsWith('/uploads/') &&
          (!Array.isArray(data.ambiente) || !data.ambiente.includes(imgPath))
        ) {
          const relativePath = imgPath.replace(/^\\|^\//, '');
          const filePath = path.join(__dirname, '../../', relativePath);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      });
    }
    const tienda = await Tienda.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(tienda);
  } catch (err) {
    res.status(400).json({ msg: 'Error al actualizar', error: err.message });
  }
};

exports.eliminarTienda = async (req, res) => {
  try {
    const tienda = await Tienda.findById(req.params.id);
    if (!tienda) return res.status(404).json({ msg: 'Tienda no encontrada' });
    // Eliminar logo físico si es un archivo local
    if (tienda.logo && tienda.logo.startsWith('/uploads/')) {
      const relativePath = tienda.logo.replace(/^\\|^\//, '');
      const filePath = path.join(__dirname, '../../', relativePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    // Eliminar imágenes de ambiente físicas si existen
    if (Array.isArray(tienda.ambiente)) {
      tienda.ambiente.forEach(imgPath => {
        if (imgPath && imgPath.startsWith('/uploads/')) {
          const relativePath = imgPath.replace(/^\\|^\//, '');
          const filePath = path.join(__dirname, '../../', relativePath);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      });
    }
    await Tienda.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Tienda eliminada' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar tienda', error: err.message });
  }
};
