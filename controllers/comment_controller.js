var models = require('../models/models');

// GET /quizes/:quizId/comments/new
exports.new = function (req, res) {
  res.render('comments/new.ejs', {
    quizid: req.params.quizId,
    errors: []
  });
};

exports.create = function (req, res) {
  var comment = models.Comment.build({
    texto : req.body.texto,
    QuizId: req.params.quizId
  });

  var validateErrors = comment.validate();
  if (validateErrors) {
    var i = 0;
    var errors = [];

    for (var prop in validateErrors) {
      errors[i++] = { message: validateErrors[prop] };
    }
    return res.render('comments/new.ejs', {
      comment : comment,
      quizid  : req.params.quizId,
      errors  : err.errors
    });
  }

  comment
    .save()
    .then(function () {
      res.redirect('/quizes/' + req.params.quizId)
    })
}
