const express = require('express');
const router = express.Router();
const charactersController = require('../controllers/characters.controller');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// router.get('/', charactersController.homeCharacterController);

router.post('/create', charactersController.createCharacterController);

router.get('/', charactersController.findCharactersController);

router.get('/find/:id', charactersController.findCharacterByIdController);

router.put('/update/:id', charactersController.updateCharacterController);

router.delete('/delete/:id', charactersController.deleteCharacterController);

// router.get('/find/:name', charactersController.findCharacterByNameController);

module.exports = router;
