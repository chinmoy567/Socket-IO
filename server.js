// Import Express framework
const express = require("express");
const app = express();

// Create HTTP server using Express
const http = require("http").createServer(app);

// Import Socket.IO Server class
const { Server } = require("socket.io");

// Attach Socket.IO to the HTTP server
const io = new Server(http);

// Serve static files (index.html, client JS, etc.) from current directory
app.use(express.static(__dirname));

// Listen for new client connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send a message to the client after 3 seconds
  // "message" is a pre-reserved Socket.IO event
  setTimeout(() => {
    socket.emit(
      "message",
      {description: "Hello from Socket.IO server!", timestamp: new Date() }
    );
  }, 3000);

  // Listen for client disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
  // Listen for messages from the client
  socket.on("message", (data) => {
    console.log("Received message from client:", data);
  });
});

// Start the server on port 3000
http.listen(3000, () => {
  console.log("http://localhost:3000");
});
