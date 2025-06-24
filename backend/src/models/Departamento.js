const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Departamento', departamentoSchema); 