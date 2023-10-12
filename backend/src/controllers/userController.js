const User = require('../models/usersData');

module.exports = {
  // Usuarios
  async create(request, response) {
    const { nome } = request.body;
    if (!nome) {
      return response
        .status(400)
        .json({ error: 'Todos os campos são obrigatórios' });
    }

    const userCreated = await User.create({
      nome,
    });

    return response.json(userCreated);
  },
};
