// Obs = abrir um terminal entrar na pasta backend e digitar npm run dev
// Abrir url localhost:3333 no navegador

// Importa o express
const express = require('express');

// Cria uma instância do express
const app = express();

// Importa o arquivo .env
require('dotenv').config();

// Importa as rotas
const routes = require('./routes');

// Importa o cors
const cors = require('cors');

// Importa a conexão com o banco de dados
require('./config/mongoConfig');

// Configura o cors
app.use(cors());

// Configura o express para receber requisições em json
app.use(express.json());

// Usa as rotas
app.use(routes);


// Porta que o app backend irá ouvir
app.listen(3333);
