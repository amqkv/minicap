require("dotenv").config();

const express = require("express");

const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

//  Database
const db = require("./config/database");

app.use(cors());
app.use(express.json());
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//  Route declaration
const indexRouter = require("./routes/index").router;
const usersRouter = require("./routes/users").router;
const patientsRouter = require("./routes/patients").router;
const adminsRouter = require("./routes/admins").router;
const immigrationOfficerRouter = require("./routes/immigration-officer").router;


// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Route utilization
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/patients", patientsRouter);
app.use("/admins", adminsRouter);
app.use("/immigration-officer", immigrationOfficerRouter);


// test DB
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log(`Error:${err}`));

module.exports = app;
