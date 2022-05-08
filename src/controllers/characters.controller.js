const charactersService = require('../services/characters.service');
const mongoose = require('mongoose');

// const homeCharacterController = (req, res) => {
//   res.send('home characters');
// };

const createCharacterController = async (req, res) => {
  const character = req.body;

  if (!character || !character.user || !character.name || !character.imageUrl) {
    return res.status(400).send({
      message:
        'Você não preencheu todos os dados para adicionar um novo character à lista!',
    });
  }

  const newCharacter = await charactersService.createCharacterService(
    character,
  );

  res.send(newCharacter);
};

const findCharactersController = async (req, res) => {
  const allCharacters = await charactersService.findCharactersService();
  res.send(allCharacters);
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

// const findCharacterByNameController = async (req, res) => {
//   const nameParam = req.params.name;

//   if (!mongoose.Types.ObjectId.isValid(nameParam)) {
//     res.status(400).send({ message: 'Name não encontrada!' });
//     return;
//   }

//   const chosenCharacter = await charactersService.findCharacterByNameController(
//     nameParam,
//   );

//   if (!chosenCharacter) {
//     return res.status(404).send({ message: 'Character não encontrado!' });
//   }

//   res.send(chosenCharacter);
// };

module.exports = {
  // homeCharacterController,
  findCharactersController,
  findCharacterByIdController,
  // findCharacterByNameController,
  createCharacterController,
  updateCharacterController,
  deleteCharacterController,
};
