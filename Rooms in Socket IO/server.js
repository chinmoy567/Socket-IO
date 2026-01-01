const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.use(express.static(__dirname));

let roomnumber = 1; // current room
let full = 0; // users in current room

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join current room
  socket.join("room-" + roomnumber);
  console.log("User joined room-" + roomnumber);

  // Send confirmation ONLY to this user
  socket.emit("connectedRoom", {
    room: "room-" + roomnumber,
    message: "You are connected to room number " + roomnumber,
  });

  // Increase user count
  full++;

  // If room has 2 users, move to next room
  if (full >= 2) {
    full = 0;
    roomnumber++;
  }

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

http.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
