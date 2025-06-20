const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const errorHandler = require('./middleware/error.middleware');

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/tiendas', require('./routes/tiendas.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/pedidos', require('./routes/pedidos.routes'));
app.use('/api/ranking', require('./routes/ranking.routes'));
app.use('/api/upload', require('./routes/upload.routes'));

// Error handler
app.use(require('./middleware/error.middleware'));

module.exports = app;
