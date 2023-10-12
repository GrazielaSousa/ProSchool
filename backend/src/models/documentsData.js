const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  // Arquivos PDF
  titulo: String,
  path: String,
  materia: String,
});

module.exports = mongoose.model('Document', DocumentSchema);