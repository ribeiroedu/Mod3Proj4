const usersService = require('../services/users.service');
const mongoose = require('mongoose');
const authService = require('../services/auth.service');

const createUserController = async (req, res) => {
  const { name, username, email, password, photo } = req.body;

  if (!name || !username || !email || !password || !photo) {
    return res.status(400).send({
      message:
        "Alguns campos estão faltando. Os campos são: 'name', 'username', 'email', 'password' ou 'photo'",
    });
  }

  const foundUser = await usersService.findByEmailUserService(email);

  if (foundUser) {
    return res.status(400).send({
      message: 'Usuário já existe!',
    });
  }

  const user = await usersService
    .createUserService(req.body)
    .catch((err) => console.log(err, message));

  if (!user) {
    return res.status(400).send({
      message: 'Erro ao criar Usuário!',
    });
  }

  const token = authService.generateToken(user._id);

  res.status(201).send({
    user: {
      id: user.id,
      name,
      username,
      email,
      password,
      photo,
    },
    token,
  });
};

const findAllUserController = async (req, res) => {
  const users = await usersService.findAllUserService();

  if (users.lenght === 0) {
    return res.status(400).send({
      message: 'Não existem usuários cadastrados!',
    });
  }
  res.send(users);
};

module.exports = { createUserController, findAllUserController };
