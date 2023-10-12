const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Usuarios
  nome: String,
}, {collection: 'usuarios'}); // Diz explicitamente a collection para criar

module.exports = mongoose.model('User', UserSchema);
