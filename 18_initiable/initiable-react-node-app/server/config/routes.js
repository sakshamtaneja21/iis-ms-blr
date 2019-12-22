const express = require('express');
const router = express.Router();

const { usersRouter } = require('../controllers/UserController');
const { uploadToAzure } = require('../controllers/UploadToAzure');
const { filesRouter } = require('../controllers/file-controller');

router.use('/api/users', usersRouter);
router.use('/api/upload', uploadToAzure);
router.use('/api/get', filesRouter);

module.exports = {
  router
};
