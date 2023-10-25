const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  // Arquivos PDF
  title: String,
  path: String,
  subject: String,
  level: String,
});

module.exports = mongoose.model('Document', DocumentSchema);