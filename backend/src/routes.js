const express = require('express');
const routes = express.Router();

// Importa os controllers
const userController = require('./controllers/userController');

// Rota Usuarios
routes.get('/', userController.getUser);
routes.post('/usuarios', userController.createUser);
routes.patch('/usuarios/:id', userController.updateUser);
routes.delete('/usuarios/:id', userController.deleteUser);

// Rota Login
routes.post('/login', userController.loginUser);

// Rotas documentos PDF

module.exports = routes;
