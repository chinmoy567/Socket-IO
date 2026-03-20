# 🚀 Socket.IO — Complete Notes (Simple & Clear)

## 📡 What is Socket.IO?

Socket.IO allows real-time communication between client and server.  
Data is sent instantly without refreshing the page.

---

## 🧠 Core Meanings

- io → everyone (server)
- socket → one user (client)
- on → listen
- emit → send

---

## ⚙️ Basic Flow

```
Client → emit → Server  
Server → on → receive  
Server → emit → Client  
Client → on → receive  
```

---

## 🔥 Types of Sending

### Send to Everyone
```js
io.emit("event", data);
```

### Send to Only Sender
```js
socket.emit("event", data);
```

### Broadcast (Everyone Except Sender)
```js
socket.broadcast.emit("event", data);
```

---

## 📡 Broadcast Concept

broadcast = everyone except sender

```js
socket.on("join", (user) => {
  socket.broadcast.emit("user-joined", user);
});
```

---

## 🟢 Online / Offline System

connect → store → broadcast online  
disconnect → remove → broadcast offline  

```js
let onlineUsers = [];

socket.on("join", (user) => {
  onlineUsers.push({
    userId: user.id,
    socketId: socket.id
  });

  socket.broadcast.emit("user-online", user);
});

socket.on("disconnect", () => {
  const user = onlineUsers.find(u => u.socketId === socket.id);

  onlineUsers = onlineUsers.filter(u => u.socketId !== socket.id);

  socket.broadcast.emit("user-offline", user);
});
```

---

## 🏠 Rooms (Group Communication)

Room = group of users

```js
socket.join("room1");

io.to("room1").emit("message", data);

socket.to("room1").emit("message", data);
```

---

## 🔐 Private Messaging (1-to-1)

socket.id = one user

```js
onlineUsers.push({
  userId: user.id,
  socketId: socket.id
});

socket.on("private-message", ({ toUserId, message }) => {
  const user = onlineUsers.find(u => u.userId === toUserId);

  if (user) {
    io.to(user.socketId).emit("private-message", message);
  }
});
```

---

## ⚔️ Final Comparison

| Method | Target |
|--------|--------|
| io.emit() | Everyone |
| socket.emit() | Only sender |
| socket.broadcast.emit() | Everyone except sender |
| io.to(room).emit() | Room |
| socket.id | Single user |

---

## 🧠 Final Memory Map

```
connection
   ↓
emit / on
   ↓
choose target:

io.emit        → all  
socket.emit    → me  
broadcast      → others  
room           → group  
socket.id      → one user  
```

---

## 🎯 Use Cases

- Chat apps  
- Video calling  
- Notifications  
- Games  
- Live dashboards  

---

## 🔥 Key Advice

- Match event names in emit and on  
- Use socket.id for users  
- Use rooms for groups  
- Use broadcast for join/leave  
