const mongoose = require('mongoose');
require('dotenv').config();

let user = process.env.NODE_USER;
let password = process.env.NODE_PASS;

const urlMongo = `mongodb+srv://${user}:${password}@cluster-1.irgwhx1.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(urlMongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoConnection = mongoose.connection;

// mongoConnection.on('error', () => {
//   console.log('Erro ao conectar ao banco de dados');
// });

// mongoConnection.on('open', () => {
//   console.log('Conexão com o banco de dados estabelecida');
// });

// const db = mongoose.connection;

module.exports = mongoConnection;
