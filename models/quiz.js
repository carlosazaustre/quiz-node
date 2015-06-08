// Definición del modelo Quiz

module.exports = function (sequelize, DataTypes) {

  var quizModel = {
    pregunta  : {
      type: DataTypes.STRING,
      validate: { notEmpty: { msg: "-> Falta Pregunta" }}
    },
    respuesta : {
      type: DataTypes.STRING,
      validate: { notEmpty: { msg: "-> Falta Respuesta" }}
    }
  };

  return sequelize.define('Quiz', quizModel);
}
