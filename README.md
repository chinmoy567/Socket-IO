# Socket.IO — Short Notes

## What is Socket.IO?

Socket.IO allows **real-time communication** between a browser and a server.  
The connection stays **open**, so data can be sent anytime **without refreshing** the page.

### Common Use Cases

- Chat applications
- Live notifications
- Games
- Real-time dashboards

---

## Core Meanings

- **io** → everyone (the server)
- **socket** → one person (one client)
- **on** → listen
- **emit** → send

### Memory Trick

---

## Built-in Events (DO NOT RENAME)

### Server-side Events

- `connection`
- `disconnect`

### Client-side Events

- `connect`
- `disconnect`
- `connect_error`
- `reconnect`

---

## Custom Events

You can name these **anything you want**, for example:

- `message`
- `chatMessage`
- `customEvent`
- `sendData`

### Rule

> The **event name in `emit` MUST match the event name in `on`**

---

## Who Sends What

- Client → sends using `socket.emit`
- Server → listens using `socket.on`
- Server → sends to everyone using `io.emit`
- Server → sends to one client using `socket.emit`

---

## Code Examples

### 1️ Server — Basic Setup

```js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("customEvent", (data) => {
    console.log("Received:", data);
    io.emit("message", data);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();

  socket.emit("customEvent", "Hello Server");

  socket.on("message", (msg) => {
    console.log("Received:", msg);
  });
</script>
```
