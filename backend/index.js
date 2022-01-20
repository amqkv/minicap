const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

const indexRouter = require('./routes/index').router;
const usersRouter = require('./routes/users').router;

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
