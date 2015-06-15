var userController = require('./user_controller');

// Middleware de autorización de accesos HTTP restingidos
exports.loginRequired = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// GET /login -- Formulario de login
exports.new = function (req, res) {
  var errors = req.session.errors || {};
  req.session.errors = {};

  res.render('sessions/new', { errors: errors });
};

// POST /login -- Crea la session
exports.create = function(req, res) {

  var login = req.body.login;
  var password = req.body.password;

  userController.autenticar(login, password, function(error, user) {

    if (error) {
      req.session.errors = [{ "message": 'Se ha producido un error: ' + error }];
      res.redirect('/login');
      return;
    }

    // Crea req.session.user y guarda campos id y username
    // la session se define por la existencia de req.session.user
    req.session.user = {
      id: user.id,
      username: user.username
    };

    res.redirect(req.session.redir.toString());
  });

};

// DELETE /logout -- Destroy session
exports.destroy = function(req, res) {
  delete req.session.user;
  res.redirect(req.session.redir.toString());
}
