require('dotenv').config();

const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//Database
const db = require('./config/database');

app.use(express.json());
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Route declaration
const indexRouter = require('./routes/index').router;
const usersRouter = require('./routes/users').router;
const patientsRouter = require('./routes/patients').router;

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Route utilization
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/patients', patientsRouter);

// CORS headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error:' + err));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
