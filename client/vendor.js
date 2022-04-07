'use strict';

const Chance = require('chance');
const chance = new Chance();
const crypto = require('crypto');

const { io } = require('socket.io-client');
const socket = io('http://localhost:3000/caps');

let emitJoin = (socket) => {
  socket.emit('JOIN', randomStoreName);
};

let emitPickup = (socket, storeName) => {
  let newOrderPayload = {
    store: storeName,
    orderID: crypto.randomUUID(),
    customer: chance.name(),
    address: chance.address(),
  };
  socket.emit('PICKUP', newOrderPayload);  
};

let handleDelivered = (socket) => {
  socket.on('DELIVERED',  (payload) => {
    console.log('Thank you', payload.customer);
  });
  if(process.env.NODE_ENV !== 'test') process.exit();
};

let randomStoreName = chance.company();

emitJoin(socket);
emitPickup(socket, randomStoreName);
handleDelivered(socket);

module.exports = {
  emitJoin,
  emitPickup,
  handleDelivered,
};