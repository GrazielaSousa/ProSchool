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
      address: { zip, street, neighborhood, complement, city, state },
      educationalData: { degree, classroom, period, enrollmentNumber },
    } = request.body;

    try {
      const cpfExist = await User.findOne({ cpf });
      const emailExist = await User.findOne({ email });

      if (emailExist || cpfExist) {
        const errors = { message: 'E-Mail ou CPF já existe' };

        return response.status(400).json({ Erro: errors });
      }

      const passwordCrypt = bcrypt.hashSync(password, 6);
      const uppercaseEnrollmentNumber = enrollmentNumber.toUpperCase();

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
        address: {
          zip,
          street,
          neighborhood,
          complement,
          city,
          state,
        },
        educationalData: {
          degree,
          classroom,
          period,
          enrollmentNumber: uppercaseEnrollmentNumber,
        },
      });

      return response
        .status(201)
        .json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
      return response.status(400).json({ error });
    }
  },

  async updateUser(request, response) {
    const { id } = request.params;

    try {
      const userInfo = await User.findById({ _id: id });
      if (!userInfo) {
        return response.status(404).json({ error: 'Usuário não encontrado!' });
      }
      // Desestruturação das variaveis
      const updatedUserInfo = {
        ...userInfo.toObject(),
        ...request.body,
      };
      // Atualiza o user
      const updatedUser = await User.findByIdAndUpdate(id, updatedUserInfo, {
        new: true,
      });

      return response.json(updatedUser);
    } catch (error) {
      return response.status(400).json({ error });
    }
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
        admin: user.admin,
        firstName: user.firstName,
        lastName: user.lastName,
        educationalData: {
          degree: user.educationalData.degree,
        },
      });
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Erro na validação: ' + error.message });
    }
  },

  async validEnrollmentNumber(request, response) {
    const enrollmentNumber = request.params.enrollmentNumber.toUpperCase();
    console.log(enrollmentNumber);


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
    const data = request.params.data;

    const cpfExist = await User.findOne({ cpf: data });
    const emailExist = await User.findOne({ email: data });

    if (cpfExist) {
      return response.status(200).json({
        message: 'CPF já existe em sistema',
        errorID: 'cpf',
        data: data,
      });
    } else if (emailExist) {
      return response.status(200).json({
        message: 'E-mail já existe em sistema',
        errorID: 'email',
        data: data,
      });
    }

    return response.status(200).json({ message: 'CPF ou E-mail disponível' });
  },
};
