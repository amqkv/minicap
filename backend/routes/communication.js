// Socket functionalities for chat messaging
function communication(io) {
    io.on("connection", socket => {
        socket.on("join_room", data => {
            socket.join(data);
        });

        socket.on("send_message", data => {
            socket.to(data.room).emit("receive_message", data);
        });
    });
}

module.exports = {
    communication,
};
