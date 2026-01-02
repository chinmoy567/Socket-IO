const express = require("express");
const app = express();

const socket = require("socket.io");

const server = app.listen(30002, () => {
  console.log("Server is running on port http://localhost:30002");
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

var io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", function (socket) {
  console.log("User Connected: " + socket.id);

  socket.on("eventCreated", function (data) {
    io.emit("responseFromServer1", data);
  });
});
