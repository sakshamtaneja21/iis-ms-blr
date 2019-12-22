const { User } = require('../models/User');

const authenticateLoginUser = function(req, res, next) {
  const email = req.body.email;
  User.findOne({ email })
    .then(function(user) {
      if (user.allowAccess) {
        next();
      } else {
        res.status('401').send({ notice: 'token not available' });
      }
    })
    .catch(function(err) {
      res.status('401').send(err);
    });
};

const authenticateUser = function(req, res, next) {
  const token = req.header('x-auth');
  User.findByToken(token)
    .then(function(user) {
      if (user.allowAccess) {
        req.user = user;
        req.token = token;

        next();
      } else {
        res.status('401').send({ notice: 'token not available' });
      }
    })
    .catch(function(err) {
      res.status('401').send(err);
    });
};

const authenticateAccess = function(req, res, next) {
  // const token = req.header('x-auth')
  Organizer.findOne(req.body.username)
    .then(function(organizer) {
      if (organizer.allowAccess) {
        next();
      } else {
        res.status('401').send({ notice: 'token not available' });
      }
    })
    .catch(function(err) {
      res.status('401').send(err);
    });
};

module.exports = {
  authenticateUser,
  authenticateAccess,
  authenticateLoginUser
};
