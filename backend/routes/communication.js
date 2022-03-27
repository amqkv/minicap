// Socket functionalities for chat messaging
function communication(io) {
    io.on("connection", socket => {
        console.log("WE GOT A NEW CONNECTION !", socket.id);

        socket.on("join_room", data => {
            socket.join(data);
            console.log(`User with ID: ${socket.id} joined room: ${data}`);
        });

        socket.on("send_message", data => {
            socket.to(data.room).emit("receive_message", data);
            console.log("Message data: ", data);
        });

        socket.on("disconnect", () => {
            console.log("USER LEFT.");
        });
    });
}

module.exports = {
    communication,
};
