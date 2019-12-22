const authorizeUser = function(req, res, next) {
  if (req.user.roles.includes('admin')) {
    next();
  } else {
    res.status('403').send({
      notice: 'the page doesnt exists'
    });
  }
};

module.exports = {
  authorizeUser
};
