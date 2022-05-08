require('dotenv').config();

const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();
const characters = require('./src/routes/characters.routes');

app.use(cors());
app.use(express.json());

const connectToDatabase = require('./src/database/database');
connectToDatabase();

app.use('/characters', characters);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
