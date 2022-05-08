const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/create', usersController.createUserController);

router.get('/', usersController.findAllUserController);

// router.get('/find/:name', charactersController.findCharacterByNameController);

module.exports = router;
