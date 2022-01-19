const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'john' && password === 'test') {
    res.status(200).json({
      id: 2,
      name: 'john',
      email: 'fakemeial@gmail.com',
    });
  } else {
    res.status(404).json({ error: 'error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
