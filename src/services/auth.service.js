const User = require('../models/Users');

const loginService = (email) =>
  User.findOne({ email: email }).select('+password');

module.exports = { loginService };
