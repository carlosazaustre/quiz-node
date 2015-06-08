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
    },
    tema : {
      type: DataTypes.ENUM,
      values: ['otro', 'humanidades', 'ocio', 'ciencia', 'tecnologia'],
      allowNull: false,
      defaultValue: 'otro',
      validate: {
        isIn: [['otro', 'humanidades', 'ocio', 'ciencia', 'tecnologia']]
      }
    }
  };

  return sequelize.define('Quiz', quizModel);
}
