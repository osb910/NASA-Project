const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//   })
// );

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
