const mongoose = require('mongoose');
require('dotenv').config();

const urlMongo = `mongodb+srv://${process.env.NODE_USER}:${process.env.NODE_PASS}${process.env.DB_CLUSTER}.irgwhx1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(urlMongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoConnection = mongoose.connection;

module.exports = mongoConnection;
