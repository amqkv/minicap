const express = require("express");
const { getMessage, sendMessage } = require("../controllers/communication-controller");

const router = express.Router();
router.use(express.json());

// Admin test page
router.get("/getMessage/:patientAccountId", (req, res) => {
    getMessage(req, res);
});

// Socket functionalities for chat messaging
function communication(io) {
    io.on("connection", socket => {
        socket.on("join_room", data => {
            socket.join(data);
        });

        socket.on("send_message", data => {
            socket.to(data.roomId).emit("receive_message", data);
            sendMessage(data);
        });
    });
}

module.exports = {
    router,
    communication,
};
