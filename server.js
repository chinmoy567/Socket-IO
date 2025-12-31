
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
app.use(express.static(__dirname));
var users = 0;

// 1 Listen for new client connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  users++;

  // 2 Broadcast to all connected clients
  io.sockets.emit("broadcast", {
    description: "New user connected",
    totalUsers: users,
  });

  // 3 Send a message to the client after 2 seconds
  setTimeout(() => {
    socket.emit("servermessage", {
      description: "Hello from Socket.IO server!",
      timestamp: new Date(),
    });
  }, 2000);

  //4 Listen for messages from the client
  socket.on("clientmessage", (data) => {
    console.log("Received message from client:", data);
  });




  // 5 newly connected user
  socket.emit("new user", {
    message: "Welcome to the chat You joined successfully ",
  });
  // 6 all previously connected users that a new user is connected
  socket.broadcast.emit("new user", {
    message: users + " a new user connected",
  });

  // Listen for client disconnection
  socket.on("disconnect", () => {
    users--;
    console.log("Total users:", users);
    io.sockets.emit("broadcast", {
      description: "a user disconnected",
      totalUsers: users,
    });
  });
});


// Start the server on port 3000
http.listen(3000, () => {
  console.log("http://localhost:3000");
});
