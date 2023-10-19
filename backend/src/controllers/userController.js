const User = require('../models/usersData');
const bcrypt = require('bcrypt');

module.exports = {
  async getUser(request, response) {
    const getUsers = await User.find();
    response.send(getUsers);
  },

  async createUser(request, response) {
    // Desestruturação das variaveis
    const {
      firstName,
      lastName,
      admin,
      email,
      dateBirth,
      cpf,
      gender,
      password,
      address,
      educationData,
    } = request.body;

    try {
      const cpfExist = await User.findOne({ cpf });
      const emailExist = await User.findOne({ email });

      if (emailExist || cpfExist) {
        return response.status(400).json({ error: 'Usuário já existe' });
      }

      if (
        firstName === '' ||
        lastName === '' ||
        password === '' ||
        email === '' ||
        dateBirth === '' ||
        cpf === '' ||
        gender === '' ||
        address === '' ||
        educationData === ''
      ) {
        return response.status(400).json({ error: 'Preencha todos os campos' });
      }

      const passwordCrypt = bcrypt.hashSync(password, 6);

      //Cria o usuario
      await User.create({
        firstName,
        lastName,
        admin: false,
        email,
        dateBirth,
        cpf,
        gender,
        password: passwordCrypt,
        address,
        educationData,
      });

      return response.status(201).json('Seu usuário foi criado 🥰');
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Erro na validação: ' + error.message });
    }
  },

  async updateUser(request, response) {
    const { firstName } = request.body;
    const { id } = request.params;

    // _id é a chave primaria do mongo e id é o parametro que passamos na rota
    const userExist = await User.findOneAndUpdate(
      { _id: id },
      { firstName: firstName },
      { new: true }
    );

    if (!userExist) {
      return response.json({ error: 'Usuário não existe' });
    }

    response.send(userExist);
  },

  async deleteUser(request, response) {
    const { id } = request.params;

    const userDeleted = await User.findOneAndDelete({ _id: id });

    if (!userDeleted) {
      return response.json({ error: 'Usuário não existe' });
    }

    response.send('Usuário deletado com sucesso');
  },

  async loginUser(request, response) {
    const { email, password } = request.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return response.status(401).json({ error: 'Usuário não encontrando' });
      }
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        return response.status(401).json({ error: 'Senha incorreta' });
      }

      response.status(200).json({
        message: 'Autenticação bem-sucedida',
        admin: user.admin,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Erro na validação: ' + error.message });
    }
  },
};
