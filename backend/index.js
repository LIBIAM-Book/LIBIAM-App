const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const initializeExpress = () => {
  const app = express();

  if (NODE_ENV === "production") {
    app.use(cors);
    app.use(morgan('combined'));
  } else {
    app.use(morgan('dev'));
  }

  app.use('/public', express.static(path.resolve(__dirname, '../public')));

  app.get('*', (req, res) => res.sendFile('index.html', { root: path.join('__dirname', '../public') }));

  app.listen(PORT, function() {
    console.log('LIBIAM APP is LIVE:', PORT)
  })
}

const initializeApp = () => {
  initializeExpress();
}

initializeApp();