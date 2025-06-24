const Producto = require('../models/Producto');
const fs = require('fs');
const path = require('path');

exports.obtenerProductos = async (req, res) => {
  const productos = await Producto.find(); // Ya no se hace populate
  res.json(productos);
};

exports.crearProducto = async (req, res) => {
  try {
    let data = req.body;
    // Si hay archivo, agregar la ruta al array imagenes
    let imagenes = [];
    if (req.file) {
      const ruta = '/uploads/productos/' + req.file.filename;
      imagenes.push(ruta);
    }
    // Si ya vienen imágenes (por ejemplo, desde el frontend), combínalas
    if (data.imagenes) {
      if (typeof data.imagenes === 'string') data.imagenes = [data.imagenes];
      imagenes = imagenes.concat(data.imagenes);
    }
    const nuevo = new Producto({ ...data, imagenes });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ msg: 'Error al crear producto', error: err.message });
  }
};

const eliminarImagenAnterior = (rutaRelativa) => {
  if (!rutaRelativa.startsWith('/uploads/')) return;
  const nombreArchivo = path.basename(rutaRelativa); // solo "imagen.jpg"
  const rutaAbsoluta = path.join(__dirname, '..', '..', 'uploads', 'productos', nombreArchivo);

  if (fs.existsSync(rutaAbsoluta)) {
    fs.unlinkSync(rutaAbsoluta);
    console.log('✅ Imagen eliminada:', rutaAbsoluta);
  } else {
    console.log('⚠ Imagen no encontrada:', rutaAbsoluta);
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const data = req.body;
    const productoActual = await Producto.findById(req.params.id).lean();
    if (!productoActual) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    let imagenes = [];
    if (req.file) {
      if (productoActual.imagenes && productoActual.imagenes.length > 0) {
        productoActual.imagenes.forEach(imgPath => {
          if (imgPath.startsWith('/uploads/')) {
            const relativePath = imgPath.replace(/^\\|^\//, '');
            const filePath = path.join(__dirname, '../../', relativePath);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
        });
      }
      const ruta = '/uploads/productos/' + req.file.filename;
      imagenes = [ruta];
    } else if (data.imagenes) {
      if (typeof data.imagenes === 'string') data.imagenes = [data.imagenes];
      imagenes = data.imagenes;
    } else {
      imagenes = productoActual.imagenes;
    }
    const update = { ...data, imagenes };
    const producto = await Producto.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(producto);
  } catch (err) {
    res.status(400).json({ msg: 'Error al actualizar', error: err.message });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
    // Eliminar imágenes físicas
    if (producto.imagenes && producto.imagenes.length > 0) {
      producto.imagenes.forEach(imgPath => {
        if (imgPath.startsWith('/uploads/')) {
          const relativePath = imgPath.replace(/^\\|^\//, '');
          const filePath = path.join(__dirname, '../../', relativePath);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      });
    }
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar producto', error: err.message });
  }
};
