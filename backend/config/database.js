const Sequelize = require("sequelize");

// config to link sequelize with the database
module.exports = new Sequelize("MinicapDatabase", "minicap", "soen390!", {
    host: "soen390minicap.database.windows.net",
    dialect: "mssql",
    dialectOptions: {
        options: {
            encrypt: true,
        },
    },
});
