const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User');

router.use(express.json());

//get all users inside the database
router.get('/', (req,res) => 
  User.findAll()
    .then(users => {
      console.log(users);
      res.json(users);
    })
    .catch(err => console.log(err))
);

//login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    if (email === 'doctor' && password === 'test') {
      res.status(200).json({
        id: 1,
        name: 'doctorName',
        email: 'doctor@gmail.com',
        type: 'doctor',
      });
    } else if (email === 'patient' && password === 'test') {
      res.status(200).json({
        id: 2,
        name: 'patient',
        email: 'patient@gmail.com',
        type: 'patient',
      });
    } else if (email === 'admin' && password === 'test') {
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