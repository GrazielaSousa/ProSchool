const express = require('express');
const routes = express.Router();
const multer = require('multer');
const Document = require('./models/documentsData');
const uuid = require('uuid').v4;
const aws = require('aws-sdk');
require('dotenv').config();
const multerS3 = require('multer-s3');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'sa-east-1',
});

uuid();

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'proschool-tcc',
    acl: 'public-read',
    key(req, file, cb) {
      cb(null, file.originalname);
      // cb(null, uuid() + path.extname(file.originalname));
    },
  }),
});

// Importa os controllers
const userController = require('./controllers/userController');
const documentsController = require('./controllers/uploadController');

// Rota Usuarios
routes.get('/', userController.getUser);
routes.post('/users', userController.createUser);
routes.put('/users/:id', userController.updateUser);
routes.delete('/deleteUser/:id', userController.deleteUser);

// Rota Login
routes.post('/login', userController.loginUser);

// Rota consultar matricula
routes.get('/user/:enrollmentNumber', userController.validEnrollmentNumber);

// Rota para consultar E-mail ou CPF
routes.get('/user/data/:data', userController.validEmailOrCpf);

// Rotas documentos PDF
routes.post('/uploads', upload.single('file'), async (req, res) => {
  try {
    if (req.file) {
      await Document.create({
        file: req.file.location,
        degree: req.body.degree,
        subject: req.body.subject,
        title: req.body.title,
        titleAWS: req.file.originalname,
      });
      res.status(200).json('Documento enviado com sucesso.');
    }
  } catch (error) {
    res.status(500).json('Apenas formato .PDF é aceito.');
  }
});

routes.get('/files', documentsController.getFile);
routes.delete('/deleteFile/:id', async (req, res) => {
  const { id } = req.params;

  const file = await Document.findById({ _id: id });

  if (!file) {
    return res.status(404).json({ message: 'Arquivo não encontrado' });
  }
  
  const s3Key = file.titleAWS;
  await s3.deleteObject({ Bucket: 'proschool-tcc', Key: s3Key }).promise();
  const fileDeleted = await Document.findByIdAndDelete({ _id: id });
  if (fileDeleted) {
    return res.json(fileDeleted);
  }
  return res.status(404).json({ message: 'Arquivo não encontrado' });
});

// Rota para consultar materiais por nível e matéria	
routes.get('/material/:subject/:degree', documentsController.getMaterialStudent);

module.exports = routes;
