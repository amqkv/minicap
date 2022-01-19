const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

const usersRouter = require('./routes/users').router;

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
