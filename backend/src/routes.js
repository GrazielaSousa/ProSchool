const express = require('express');
const routes = express.Router();

// Importa os controllers
const userController = require('./controllers/userController');

// Rota Usuarios
routes.get('/', userController.getUser);
routes.post('/users', userController.createUser);
routes.patch('/users/:id', userController.updateUser);
routes.delete('/users/:id', userController.deleteUser);

// Rota Login
routes.post('/login', userController.loginUser);

// Rota consultar matricula
routes.get('/user/:enrollmentNumber', userController.validEnrollmentNumber);

// Rota para consultar E-mail ou CPF
routes.get('/user/data/:data', userController.validEmailOrCpf);

// Rotas documentos PDF

module.exports = routes;
