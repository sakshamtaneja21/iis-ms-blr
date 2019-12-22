const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

mongoose.Promise - global.Promise;

const userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },

  userName: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value);
      },
      message: function() {
        return 'Invalid email format';
      }
    }
  },

  mobile: {
    type: Number
  },

  roles: {
    type: String,
    default: 'admin'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  tokens: [
    {
      token: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

  allowAccess: {
    type: Boolean,
    default: true
  }
});

// pre hooks - Model Middlewares -
userSchema.pre('save', function(next) {
  const user = this;
  if (user.isNew) {
    function encryptPassword() {
      return bcryptjs.genSalt(10).then(function(salt) {
        return bcryptjs
          .hash(user.password, salt)
          .then(function(encryptedPassword) {
            user.password = encryptedPassword;
          });
      });
    }

    function setRole() {
      return User.countDocuments().then(function(count) {
        if (count == 0) {
          user.roles = 'admin';
        }
      });
    }

    return Promise.all([encryptPassword(), setRole()])
      .then(function(values) {
        next();
      })
      .catch(function(err) {
        return Promise.reject(err.message);
      });
  } else {
    next();
  }
});

// own instance methods
userSchema.methods.generateToken = function() {
  const user = this;
  const tokenData = {
    _id: user._id,
    roles: user.roles,
    username: user.username,
    createdAt: Number(new Date())
  };

  const token = jwt.sign(tokenData, 'jwt@123');
  user.tokens.push({
    token
  });

  return user
    .save()
    .then(function(user) {
      return Promise.resolve(token);
    })
    .catch(function(err) {
      return Promise.reject(err);
    });
};

// own static method
userSchema.statics.findByCredentials = function(email, password) {
  const User = this;
  return User.findOne({ email })
    .then(function(user) {
      if (!user) {
        return Promise.reject({ errors: 'Invalid email / password' });
      }

      return bcryptjs.compare(password, user.password).then(function(result) {
        if (result) {
          return Promise.resolve(user);
        } else {
          return Promise.reject({ errors: 'Invalid email / password' });
        }
      });
    })
    .catch(function(err) {
      return Promise.reject(err);
    });
};

userSchema.statics.findByToken = function(token) {
  const User = this;
  let tokenData;
  try {
    tokenData = jwt.verify(token, 'jwt@123');
  } catch (err) {
    return Promise.reject(err);
  }

  return User.findOne({ _id: tokenData._id, 'tokens.token': token });
};

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
