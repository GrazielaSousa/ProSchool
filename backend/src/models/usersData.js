const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema(
  {
    // Usuarios
    firstName: String,
    lastName: String,
    admin: Boolean,
    email:{
      type: String,
      unique: true,
    },
    dateBirth: String,
    cpf:{
      type: String,
      unique: true,
    },
    gender: String,
    password: String,
    address: {
      zip: String,
      street: String,
      neighborhood: String,
      complement: String,
      city: String,
      state: String,
    },
    educationalData: {
      degree: String,
      classroom: String,
      period: String,
      enrollmentNumber: String,
    },
  },
  { collection: 'usuarios' }
); // Diz explicitamente a collection para criar

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
