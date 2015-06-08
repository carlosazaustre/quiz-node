var path = require('path');

// Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, {
  dialect: "sqlite",
  storage: "quiz.sqlite"
});

// Importar la definición de la tabla Quiz
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Exportar la definición de la tabla Quiz
exports.Quiz = Quiz;

// Crea e inicializa la tabla de preguntas en la DB
sequelize
  .sync()
  .success(function () {
    Quiz
      .count()
      .success(function (count) {

        // La tabla se inicializa sólo si está vacía
        if (count === 0) {
          Quiz.create({
            pregunta  : "Capital de Italia",
            respuesta : "Roma"
          })
          .success(function () {
            console.log("Base de datos inicializada")
          });
        }
      });
  });
