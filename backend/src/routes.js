const express = require('express');
const routes = express.Router();

// Importa os controllers
const userController = require('./controllers/userController');

// Rota Usuarios
routes.post('/usuarios', userController.create);

module.exports = routes;
