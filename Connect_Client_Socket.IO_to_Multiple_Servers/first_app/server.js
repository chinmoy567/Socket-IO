const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

server.listen(30001, () => {
  console.log("Server running at http://localhost:30001");
});

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("Client connected to 30001:", socket.id);
});
