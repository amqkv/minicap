const Sequelize = require('sequelize');
const db = require('../config/database');

//User model associated with Database User table
const User = db.define('User', {
    UserId: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    FirstName: {
        type: Sequelize.STRING
    },
    LastName: {
        type: Sequelize.STRING
    },
    Gender: {
        type: Sequelize.STRING
    },
    Birthdate: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING
    },
    Password: {
        type: Sequelize.STRING
    },
    Address: {
        type: Sequelize.STRING
    },
    City: {
        type: Sequelize.STRING
    },
    PhoneNumber: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
})

module.exports = User;