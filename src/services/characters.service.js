const Character = require('../models/Characters');

const createCharacterService = async (character, userId) => {
  const characterCriado = await Character.create({ character, user: userId });
  return characterCriado;
};

const findCharactersService = async () => {
  const characters = await Character.find().sort({ _id: -1 }).populate('user');
  return characters;
};

const findCharacterByIdService = async (id) => {
  const character = await Character.findById(id);
  return character;
};

const updateCharacterService = async (id, characterEdited) => {
  const characterAtualizado = await Character.findByIdAndUpdate(
    id,
    characterEdited,
  );
  return characterAtualizado;
};

const deleteCharacterService = async (id) => {
  return await Character.findByIdAndDelete(id);
};

const findCharacterByIdadeService = async (valor) => {
  const character = await Character.findByValor(valor);
  return character;
};

module.exports = {
  findCharactersService,
  findCharacterByIdService,
  findCharacterByIdadeService,
  createCharacterService,
  updateCharacterService,
  deleteCharacterService,
};
