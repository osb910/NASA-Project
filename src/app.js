const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// app.use(
//   cors({
//     origin: 'https://nasa-mission-control-omarsh.vercel.app/',
//   })
// );
// origin: 'http://localhost:3000',
// origin: '*',

// app.use((req, res, next) => {
//   //   res.header(
//   //     'Access-Control-Allow-Headers',
//   //     'Origin, X-Requested-With, Content-Type, Accept'
//   //   );
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   // another common pattern
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET,OPTIONS,PATCH,DELETE,POST,PUT'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   );
//   next();
// });

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', api);

app.get('/*', cors(corsOptions), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
