const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Usuarios
  nome: String,
  sobrenome: String,
  email: String,
  dataNascimento: String,
  cpf: String,
  genero: String,
  senha: String,
  endereco: {
      cep: String,
      rua: String,
      bairro: String,
      complemento: String,
      cidade: String,
      estado: String,
  },
  dadoEscolar: {
      grau: String,
      nivel: String,
      turma: String,
      periodo: String,
      matricula: String
  }
});

module.exports = mongoose.model('User', UserSchema);