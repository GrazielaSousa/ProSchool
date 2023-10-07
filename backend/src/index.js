// Obs = abrir um terminal entrar na pasta backend e digitar npm run dev
// Abrir url localhost:3333 no navegador

// Importa o express
const express = require('express');

// Cria uma instância do express
const app = express();

// Importa o arquivo .env
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Teste servidor');
});

// Porta que o app backend irá ouvir
app.listen(3333);
