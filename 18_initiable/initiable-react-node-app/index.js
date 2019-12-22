const express = require('express');
const { mongoose } = require('./server/config/database');
// const uploadLocation = require('./client/src/uploads/uploadsLocation');
const { router } = require('./server/config/routes');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static(`${uploadLocation}`));
app.use('/', router);
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
