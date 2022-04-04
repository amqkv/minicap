const http = require("http");
const socketio = require("socket.io");
const app = require("./index");
const { CLIENT_URL } = require("./utils/constants");
const { communication } = require("./routes/communication");

// Socket server
const server = http.createServer(app);
const io = new socketio.Server(server, {
    cors: {
        origin: CLIENT_URL,
    },
});

// Socket functionality
communication(io);

const port = 3001;

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
