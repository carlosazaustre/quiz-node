var models = require('../models/models');

// Autoload - Factoriza el código si la ruta incluye :quizId
exports.load = function (req, res, next, quizId) {
  models.Quiz
    .find(quizId)
    .then(function (quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else {
        next( new Error("No existe quizId=" + quizId) );
      }
    })
    .catch(function (error) {
      next(error);
    });
}

// GET /quizes
exports.index = function (req, res, next) {
  var searchName = req.query.search || "";
  searchName = searchName.split(" ").join("%");
  searchName = "%" + searchName + "%";

  console.log(searchName);

  models.Quiz
    .findAll({
      where: ["pregunta like ?", searchName]
    })
    .then(function (quizes) {
      res.render('quizes/index', { quizes: quizes });
    })
    .catch(function (error) {
      next(error);
    })
}

// GET /quizes/:id
exports.show = function (req, res) {
  res.render('quizes/show', { quiz: req.quiz });
}

// GET /quizes/:id/answer
exports.answer = function (req, res) {
  var resultado = 'Incorrecto';

  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }

  res.render('quizes/answer', {
    quiz: req.quiz,
    respuesta: resultado
  });

}
