// Configuración de multer para subir imágenes de productos y tiendas
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Carpeta según el tipo de recurso
    let folder = 'uploads/productos';
    if (req.baseUrl.includes('tiendas')) folder = 'uploads/tiendas';
    cb(null, path.join(__dirname, '../../', folder));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + Date.now() + ext;
    cb(null, name);
  }
});

const fileFilter = (req, file, cb) => {
  // Solo imágenes
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Solo se permiten imágenes'), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
