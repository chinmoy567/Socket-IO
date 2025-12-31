const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
app.use(express.static(__dirname));
var users = 0;


// 1 Handle connection events for the custom namespace
var cnsp1 = io.of("/custom-namespace1");
cnsp1.on("connection", function (socket) {
  console.log("A user connected from custom-namespace1");
  cnsp1.emit("customEvent", "Tester event call");
  socket.on("disconnect", function () {
    console.log("A user disconnected from custom-namespace1");
  });
});

// 2 Handle connection events for another custom namespace
var cnsp2 = io.of("/custom-namespace2");
cnsp2.on("connection", function (socket) {
  console.log("A user connected from custom-namespace2");
  cnsp2.emit("customEvent", "Tester event call");
  socket.on("disconnect", function () {
    console.log("A user disconnected from custom-namespace2");
  });
});

// Start the server on port 3000
http.listen(3000, () => {
  console.log("http://localhost:3000");
});
