const mongoose = require('mongoose');
require('dotenv').config();

let user = process.env.NODE_USER;
let password = process.env.NODE_PASS;

// const urlMongo = `mongodb+srv://flowerofevill_:Liftedcl01@cluster-1.irgwhx1.mongodb.net/?retryWrites=true&w=majority`;
const urlMongo = `mongodb+srv://${user}:${password}@cluster-1.irgwhx1.mongodb.net/proschool?retryWrites=true&w=majority`;

mongoose.connect(urlMongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoConnection = mongoose.connection;

module.exports = mongoConnection;
