const express = require('express');
const router = express.Router();
router.use(express.json());


router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (username === 'doctor' && password === 'test') {
      res.status(200).json({
        id: 1,
        name: 'doctorName',
        email: 'doctor@gmail.com',
        type: 'doctor',
      });
    } else if (username === 'patient' && password === 'test') {
      res.status(200).json({
        id: 2,
        name: 'patient',
        email: 'patient@gmail.com',
        type: 'patient',
      });
    } else if (username === 'admin' && password === 'test') {
      res.status(200).json({
        id: 3,
        name: 'admin',
        email: 'admin@gmail.com',
        type: 'admin',
      });
    } else {
      res.status(404).json({ error: 'error' });
    }
  });


  module.exports = {
    router: router
  };