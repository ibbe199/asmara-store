require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'asmara-store-dev-secret';

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

const users = [];
const listings = [];
const messages = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('send_message', (data) => {
    messages.push(data);
    io.to(data.to).emit('receive_message', data);
  });
});

app.post('/api/messages/send', (req, res) => {
  const { to, from, text } = req.body;
  const msg = { id: uuid(), to, from, text };
  messages.push(msg);
  io.to(to).emit('receive_message', msg);
  res.json(msg);
});

server.listen(PORT, () => {
  console.log("🔥 Real-time server running on " + PORT);
});
