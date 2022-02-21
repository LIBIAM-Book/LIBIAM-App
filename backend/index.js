const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const routers = require('./routers');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const dbHelper = require('./dbHelper.js');

const initializeExpress = () => {
  const app = express();

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  if (NODE_ENV === 'production') {
    app.use(cors);
    app.use(morgan('combined'));
  } else {
    app.use(morgan('dev'));
  }

  app.use('/', express.static(path.resolve(__dirname, '../public')));

  app.use('/api', routers)

  app.get('*', (req, res) =>
    res.sendFile('index.html', { root: path.join('__dirname', '../public') })
  );

  app.listen(PORT, function () {
    console.log('LIBIAM APP is LIVE:', PORT);
  });
};

const initializeApp = () => {
  initializeExpress();
  dbHelper.testConnection()
};

initializeApp();
