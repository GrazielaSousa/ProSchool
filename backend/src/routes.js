const express = require('express');
const routes = express.Router();

// Importa os controllers
const userController = require('./controllers/userController');


// Rota User
routes.post('/user', userController.create);


module.exports = routes;