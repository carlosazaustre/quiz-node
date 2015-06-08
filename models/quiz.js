// Definición del modelo Quiz

module.exports = function (sequelize, DataTypes) {

  var quizModel = {
    pregunta  : DataTypes.STRING,
    respuesta : DataTypes.STRING
  }

  return sequelize.define('Quiz', quizModel); 
}
