const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Usuarios
  nome: String,
});

module.exports = mongoose.model('User', UserSchema);
