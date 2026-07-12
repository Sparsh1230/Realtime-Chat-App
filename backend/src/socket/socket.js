const { Server } = require("socket.io");

let io;
const onlineUsers = new Map();

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User Connected:", socket.id);

    socket.on("join", (username) => {
      onlineUsers.set(socket.id, username);

      io.emit("onlineUsers", Array.from(onlineUsers.values()));
    });

    socket.on("typing", (username) => {
      socket.broadcast.emit("typing", username);
    });

    socket.on("stopTyping", () => {
      socket.broadcast.emit("stopTyping");
    });

    socket.on("disconnect", () => {
      console.log("🔴 User Disconnected:", socket.id);

      onlineUsers.delete(socket.id);

      io.emit("onlineUsers", Array.from(onlineUsers.values()));
    });
  });
};

const getIO = () => io;

module.exports = {
  initializeSocket,
  getIO,
};