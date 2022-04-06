'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3000/caps');

const handlePickup = (socket) => (payload) => {
  console.log('DRIVER: picked up', payload.orderID);
  socket.emit('IN-TRANSIT', payload);
  console.log('DRIVER: delivered', payload.orderID);
  socket.emit('DELIVERED', payload);
};

socket.on('PICKUP', handlePickup(socket));

module.exports = {
  handlePickup,
};