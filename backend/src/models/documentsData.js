const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema(
  {
    // Arquivos PDF
    title: String,
    titleAWS: String,
    file: String,
    subject: String,
    degree: String,
  },
  { collection: 'materiais' }
);

module.exports = mongoose.model('Document', DocumentSchema);
