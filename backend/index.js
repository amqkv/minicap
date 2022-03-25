require("dotenv").config();

const express = require("express");

const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

// Socket server
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", socket => {
    console.log("WE GOT A NEW CONNECTION !");

    socket.on("disconnect", () => {
        console.log("USER LEFT.");
    });
});

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
const doctorsRouter = require("./routes/doctors").router;
const adminsRouter = require("./routes/admins").router;
const statusRouter = require("./routes/status").router;
const patientsRouter = require("./routes/patients").router;
const immigrationOfficerRouter = require("./routes/immigration-officer").router;
const healthOfficialRouter = require("./routes/health-official").router;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Route utilization
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/doctors", doctorsRouter);
app.use("/admins", adminsRouter);
app.use("/status", statusRouter);
app.use("/patients", patientsRouter);
app.use("/immigration-officer", immigrationOfficerRouter);
app.use("/health-official", healthOfficialRouter);

// test DB
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log(`Error:${err}`));

module.exports = app;
