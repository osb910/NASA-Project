const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

// const corsOptions = {
//   origin: function (origin, callback) {
//     // db.loadOrigins is an example call to load
//     // a list of origins from a backing database
//     db.loadOrigins(function (error, origins) {
//       callback(error, origins);
//     });
//   },
// };

app.use(
  cors({
    origin: 'http://127.0.0.1:3000',
  })
);
// app.options('*', cors());
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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
