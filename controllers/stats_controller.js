var models = require('../models/models')

exports.index = function (req, res) {
  /*
  El número de preguntas
  El número de comentarios totales
  El número medio de comentarios por pregunta
  El número de preguntas sin comentarios
  El número de preguntas con comentarios
  */

  var data = {};

  searchQuizes();

  function searchQuizes () {
    models.Quiz
    .findAll()
    .then(function(quizes) {
      data.numQuizes = Number(quizes.length);

      models.Comment
        .findAll()
        .then(function(comments) {
          data.numComments = Number(comments.length);
          data.avg = data.numComments / data.numQuizes;

          renderPage();
        });
    });
  }

  function renderPage() {
    res.render('quizes/stats', {
      errors: [],
      data: data
    });
  }

}
