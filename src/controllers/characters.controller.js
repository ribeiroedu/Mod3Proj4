const charactersService = require('../services/characters.service');
const mongoose = require('mongoose');

// const homeCharacterController = (req, res) => {
//   res.send('home characters');
// };

const createCharacterController = async (req, res) => {
  const character = req.body;
  req.body.user = req.userId;

  if (!character || !character.name || !character.imageUrl) {
    return res.status(400).send({
      message:
        'Você não preencheu todos os dados para adicionar um novo character à lista!',
    });
  }

  const newCharacter = await charactersService.createCharacterService(req.body);

  res.send(newCharacter);
};

const findCharactersController = async (req, res) => {
  try {
    const character = await charactersService.findCharactersService();

    if (character.length === 0) {
      return res.status(400).send({ message: 'Não existem personagens!' });
    }

    return res.send({
      results: character.map((charac) => ({
        id: charac._id,
        user: charac.user,
        name: charac.name,
        imageUrl: charac.imageUrl,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findCharacterByIdController = async (req, res) => {
  const idParam = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: 'ID inválido!' });
    return;
  }

  const chosenCharacter = await charactersService.findCharacterByIdService(
    idParam,
  );

  if (!chosenCharacter) {
    return res.status(404).send({ message: 'Character não encontrado!' });
  }

  res.send(chosenCharacter);
};

const updateCharacterController = async (req, res) => {
  const idParam = req.params.id;
  const characterEdit = req.body;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: 'ID inválido!' });
    return;
  }

  const chosenCharacter = await charactersService.findCharacterByIdService(
    idParam,
  );

  if (!chosenCharacter) {
    return res.status(404).send({ message: 'Character não encontrado!' });
  }

  if (!characterEdit || !characterEdit.name || !characterEdit.imageUrl) {
    return res.status(400).send({
      message: 'Você não preencheu todos os dados para editar o character!',
    });
  }

  const updatedCharacter = await charactersService.updateCharacterService(
    idParam,
    characterEdit,
  );

  res.send(updatedCharacter);
};

const deleteCharacterController = async (req, res) => {
  const idParam = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: 'ID inválido!' });
    return;
  }

  const chosenCharacter = await charactersService.findCharacterByIdService(
    idParam,
  );

  if (!chosenCharacter) {
    return res.status(404).send({ message: 'Character não encontrado!' });
  }

  await charactersService.deleteCharacterService(idParam);

  res.send({ message: 'Character deletado com sucesso!' });
};

const searchCharacterController = async (req, res) => {
  const { message } = req.query;

  const character = await charactersService.searchCharacterService(message);

  if (character.length === 0) {
    return res
      .status(400)
      .send({ message: 'Não existem personagens com esse nome!' });
  }

  return res.send({
    results: character.map((charac) => ({
      id: charac._id,
      user: charac.user,
      name: charac.name,
      imageUrl: charac.imageUrl,
    })),
  });
};

module.exports = {
  // homeCharacterController,
  findCharactersController,
  findCharacterByIdController,
  // findCharacterByNameController,
  createCharacterController,
  updateCharacterController,
  deleteCharacterController,
  searchCharacterController,
};
