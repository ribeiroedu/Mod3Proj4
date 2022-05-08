const mongoose = require('mongoose');

function connectToDatabase() {
  mongoose
    .connect(
      'mongodb+srv://root:admin@api-rickandmorty.j0zld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    .then(() => {
      console.log('MONGO DB CONECTADO');
    })
    .catch((err) => {
      return console.log(`Erro na conexão com o banco: ${err}`);
    });
}

module.exports = connectToDatabase;
