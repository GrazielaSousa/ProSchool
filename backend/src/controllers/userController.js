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
      educationalData,
    } = request.body;

    try {
      const cpfExist = await User.findOne({ cpf });
      const emailExist = await User.findOne({ email });

      if (emailExist || cpfExist) {
        const errors = {};

        // if (emailExist) {
        //   errors.email = { id: 'email', message: 'Email já cadastrado' };
        // }

        // if (cpfExist) {
        //   errors.cpf = { id: 'cpf', message: 'CPF já cadastrado' };
        // }

        return response.status(400).json({ errors });
      }

      if (
        firstName === '' ||
        lastName === '' ||
        password === '' ||
        email === '' ||
        dateBirth === '' ||
        admin === '' ||
        cpf === '' ||
        gender === '' ||
        address === '' ||
        educationalData === ''
      ) {
        return response.status(400).json({ error: 'Preencha todos os campos' });
      }

      const passwordCrypt = bcrypt.hashSync(password, 6);

      //Cria o usuario
      await User.create({
        firstName,
        lastName,
        admin,
        email,
        dateBirth,
        cpf,
        gender,
        password: passwordCrypt,
        address,
        educationalData,
      });

      return response.status(201).json('Seu usuário foi criado 🥰');
    } catch (error) {
      return response.status(400).json({ error });
    }
  },

  async updateUser(request, response) {
    const { cpf } = request.body;
    const { id } = request.params;

    // _id é a chave primaria do mongo e id é o parametro que passamos na rota
    const userExist = await User.findOneAndUpdate(
      { _id: id },
      { cpf: cpf },
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

  async validEnrollmentNumber(request, response) {
    const enrollmentNumber = request.params.enrollmentNumber;

    console.log('Matrícula: ' + request.params.enrollmentNumber);

    const userEnrollmentNumber = await User.findOne({
      'educationalData.enrollmentNumber': enrollmentNumber,
    });

    if (userEnrollmentNumber) {
      return response
        .status(409)
        .json({ error: 'Matrícula já cadastrada em sistema' });
    }

    response.status(200).json({ message: 'Matrícula não encontrada' });
  },
  
  async validEmailOrCpf(request, response) {
    const data = request.params.data.cpf;
    // const data = request.params.data;
    console.log('===========');
    console.log('dados ' + request.params.data);

    const cpfExist = await User.findOne({ cpf: data });
    // const emailExist = await User.findOne({ email: email });
    console.log('cpf achado = ' + cpfExist);
    // console.log('email achado = ' + emailExist);
    if (cpfExist) {
      return response.status(200).json({ message: 'CPF já cadastrado' });
    } 

    return response.status(200).json({ message: 'CPF ou E-mail disponível' });
  },
};
