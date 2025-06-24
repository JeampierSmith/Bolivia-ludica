const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const maxSize = 2 * 1024 * 1024; // 2MB
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

function uploadProducto(req, res) {
 
  const uploadDir = path.join(__dirname, '../../uploads/productos');
  fs.mkdirSync(uploadDir, { recursive: true });
  const form = new formidable.IncomingForm({ multiples: false, uploadDir, keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error formidable:', err);
      return res.status(500).json({ msg: 'Error al subir imagen', error: err.message });
    }
    let file = files.file;
    if (Array.isArray(file)) file = file[0];
    if (!file || !file.filepath) {
      console.error('No se recibió archivo válido en la petición:', files);
      return res.status(400).json({ msg: 'No se recibió archivo válido' });
    }
    // Validar tipo
    if (!allowedTypes.includes(file.mimetype)) {
      if (file.filepath) fs.unlinkSync(file.filepath);
      console.error('Tipo de archivo no permitido:', file.mimetype);
      return res.status(400).json({ msg: 'Tipo de archivo no permitido' });
    }
    // Validar tamaño
    if (file.size > maxSize) {
      if (file.filepath) fs.unlinkSync(file.filepath);
      console.error('Archivo excede tamaño máximo:', file.size);
      return res.status(400).json({ msg: 'El archivo excede el tamaño máximo de 2MB' });
    }
    const url = `/uploads/productos/${path.basename(file.filepath)}`;
    console.log('Imagen subida correctamente:', url);
    res.json({ url });
  });
}

function uploadTienda(req, res) {
  // Cambiado para guardar en backend/uploads/tiendas
  const uploadDir = path.join(__dirname, '../../uploads/tiendas');
  fs.mkdirSync(uploadDir, { recursive: true });
  const form = new formidable.IncomingForm({ multiples: false, uploadDir, keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    let file = files.file;
    if (Array.isArray(file)) file = file[0];
    if (err) return res.status(500).json({ msg: 'Error al subir logo' });
    if (!file || !file.filepath) {
      return res.status(400).json({ msg: 'No se recibió archivo válido' });
    }
    // Validar tipo
    if (!allowedTypes.includes(file.mimetype)) {
      if (file.filepath) fs.unlinkSync(file.filepath);
      return res.status(400).json({ msg: 'Tipo de archivo no permitido' });
    }
    // Validar tamaño
    if (file.size > maxSize) {
      if (file.filepath) fs.unlinkSync(file.filepath);
      return res.status(400).json({ msg: 'El archivo excede el tamaño máximo de 2MB' });
    }
    const url = `/uploads/tiendas/${path.basename(file.filepath)}`;
    res.json({ url });
  });
}

function uploadRanking(req, res) {
  const uploadDir = path.join(__dirname, '../../uploads/ranking');
  fs.mkdirSync(uploadDir, { recursive: true });
  const form = new formidable.IncomingForm({ multiples: false, uploadDir, keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    let file = files.file;
    if (Array.isArray(file)) file = file[0];
    if (err) return res.status(500).json({ msg: 'Error al subir avatar' });
    if (!file || !file.filepath) {
      return res.status(400).json({ msg: 'No se recibió archivo válido' });
    }
    // Validar tipo
    if (!allowedTypes.includes(file.mimetype)) {
      if (file.filepath) fs.unlinkSync(file.filepath);
      return res.status(400).json({ msg: 'Tipo de archivo no permitido' });
    }
    // Validar tamaño
    if (file.size > maxSize) {
      if (file.filepath) fs.unlinkSync(file.filepath);
      return res.status(400).json({ msg: 'El archivo excede el tamaño máximo de 2MB' });
    }
    const url = `/uploads/ranking/${path.basename(file.filepath)}`;
    res.json({ url });
  });
}

module.exports = { uploadProducto, uploadTienda, uploadRanking };