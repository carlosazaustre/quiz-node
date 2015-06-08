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
      where: ["lower(pregunta) like ?", searchName.toLowerCase()]
    })
    .then(function (quizes) {
      res.render('quizes/index', { quizes: quizes, errors: [] });
    })
    .catch(function (error) {
      next(error);
    })
}

// GET /quizes/:id
exports.show = function (req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors: [] });
}

// GET /quizes/:id/edit
exports.edit = function (req, res) {
  res.render('quizes/edit', { quiz: req.quiz, errors: [] });
}

// PUT /quizes/:id
exports.update = function (req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;

  var validateErrors = req.quiz.validate();
  if (validateErrors) {
    var i = 0;
    var errors = [];

    for (var prop in validateErrors) {
      errors[i++] = { message: validateErrors[prop] };
    }
    return res.render('quizes/new', { quiz: quiz, errors: errors });
  }

  req.quiz
    .save({
      fields: ["pregunta", "respuesta", "tema"]
    })
    .then(function() {
      res.redirect('/quizes');
    });
}

// DELETE /quizes/:id
exports.destroy = function (req, res, next) {
  req.quiz
    .destroy()
    .then(function() {
      res.redirect('/quizes');
    })
    .catch(function(err) {
      next(err);
    });
}

// GET /quizes/:id/answer
exports.answer = function (req, res) {
  var resultado = 'Incorrecto';

  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }

  res.render('quizes/answer', {
    quiz      : req.quiz,
    respuesta : resultado,
    errors    : []
  });

}

// GET /quizes/new
exports.new = function (req, res) {
  var quiz = models.Quiz.build({
    pregunta  : "Pregunta",
    respuesta : "Respuesta",
    tema      : "otro"
  });

  res.render('quizes/new', { quiz: quiz, errors: [] });
}

// POST /quizes/create
exports.create = function (req, res, next) {
  var quiz = models.Quiz.build( req.body.quiz );

  var validateErrors = quiz.validate();
  if (validateErrors) {
    var i = 0;
    var errors = [];

    for (var prop in validateErrors) {
      errors[i++] = { message: validateErrors[prop] };
    }
    return res.render('quizes/new', { quiz: quiz, errors: errors });
  }

  quiz
    .save({
      fields: ["pregunta", "respuesta", "tema"]
    })
    .then(function () {
      res.redirect('/quizes/');
    });
}
