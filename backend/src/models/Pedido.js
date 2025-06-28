const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nombreCliente: { type: String }, 
  productos: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: { type: Number, default: 1 }
  }],
  total: { type: Number, required: true },
  estado: { 
    type: String, 
    enum: ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  direccionEntrega: { type: String },
  fechaPedido: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Pedido', pedidoSchema);
