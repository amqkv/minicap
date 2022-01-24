const express = require('express');
const app = express();
const port = 3001;
const path = require('path');

//Database
const db = require('./config/database');

app.use(express.json());

//Route declaration
const indexRouter = require('./routes/index').router;
const usersRouter = require('./routes/users').router;

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Route utilization
app.use('/', indexRouter);
app.use('/users', usersRouter);

//test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log('Error:' + err));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

