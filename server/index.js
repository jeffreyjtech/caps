'use strict';

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = new Server(PORT);
const caps = server.of('/caps');

const addLogger = require('./event-logger');

caps.on('connection', socket => {

  console.log('Poggers! Socket connected!', socket.id);

  addLogger(socket);

  socket.on('PICKUP', (payload) => {
    console.log('Relaying PICKUP');
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('DELIVERED', (payload) => {
    console.log('Relaying DELIVERED');
    socket.broadcast.emit('DELIVERED', payload);
  });
});

console.log('caps.on() executed, server should be up');