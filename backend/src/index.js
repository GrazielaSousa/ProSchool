// Importa o express
const express = require('express');

// Cria uma instância do express
const app = express();

require('dotenv').config();

const routes = require('./routes');

const cors = require('cors');

// Importa a conexão com o banco de dados
require('./config/mongoConfig');

app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Configura o express para receber requisições em json
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(routes);

// Porta que o app backend irá ouvir
app.listen(3333);
