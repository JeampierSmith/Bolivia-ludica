const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const maxSize = 2 * 1024 * 1024; // 2MB
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

function uploadProducto(req, res) {
  const uploadDir = path.join(__dirname, '../uploads/productos');
  fs.mkdirSync(uploadDir, { recursive: true });
  const form = formidable({ multiples: false, uploadDir, keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ msg: 'Error al subir imagen' });
    const file = files.file;
    // Validar tipo
    if (!allowedTypes.includes(file.mimetype)) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ msg: 'Tipo de archivo no permitido' });
    }
    // Validar tamaño
    if (file.size > maxSize) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ msg: 'El archivo excede el tamaño máximo de 2MB' });
    }
    const url = `/uploads/productos/${path.basename(file.filepath)}`;
    res.json({ url });
  });
}

function uploadTienda(req, res) {
  const uploadDir = path.join(__dirname, '../uploads/tiendas');
  fs.mkdirSync(uploadDir, { recursive: true });
  const form = formidable({ multiples: false, uploadDir, keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ msg: 'Error al subir logo' });
    const file = files.file;
    // Validar tipo
    if (!allowedTypes.includes(file.mimetype)) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ msg: 'Tipo de archivo no permitido' });
    }
    // Validar tamaño
    if (file.size > maxSize) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ msg: 'El archivo excede el tamaño máximo de 2MB' });
    }
    const url = `/uploads/tiendas/${path.basename(file.filepath)}`;
    res.json({ url });
  });
}

module.exports = { uploadProducto, uploadTienda };