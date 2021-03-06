const mongoose = require('mongoose');
require('../models/Users');

const CharacterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Character = mongoose.model('characters', CharacterSchema);

module.exports = Character;
