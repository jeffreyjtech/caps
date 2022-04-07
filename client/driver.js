'use strict';

const Client = require('./lib/client');
const driverClient = new Client('driver');

console.log('Fetching events from server');
driverClient.publish('get-all', { eventName: 'PICKUP', queueId: 'driver' });

driverClient.subscribe('PICKUP', (payload) => {
  console.log('DRIVER: picked up', payload.orderID);
  driverClient.publish('received', payload);
  driverClient.publish('IN-TRANSIT', payload);
  console.log('DRIVER: delivered', payload.orderID);
  driverClient.publish('DELIVERED', payload);
});

module.exports = driverClient;

/*
const { io } = require('socket.io-client');
const socket = io('http://localhost:3000/caps');

const handlePickup = (socket) => (payload) => {
  console.log('DRIVER: picked up', payload.orderID);
  socket.emit('IN-TRANSIT', payload);
  console.log('DRIVER: delivered', payload.orderID);
  socket.emit('DELIVERED', payload);
};

socket.on('PICKUP', handlePickup(socket));
*/