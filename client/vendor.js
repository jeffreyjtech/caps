'use strict';

const Chance = require('chance');
const chance = new Chance();
const crypto = require('crypto');

const { io } = require('socket.io-client');
const socket = io('http://localhost:3000/caps');

let pickupEmitter = (socket) => (storeName) => {
  let newOrderPayload = {
    store: storeName,
    orderID: crypto.randomUUID(),
    customer: chance.name(),
    address: chance.address(),
  };
  socket.emit('PICKUP', newOrderPayload);  
};

let deliveredListener = (socket) => {
  socket.on('DELIVERED', (payload) => console.log('Thank you', payload.customer));
};

let randomStore = chance.company();

pickupEmitter(socket)(randomStore);
deliveredListener(socket);

module.exports = {
  pickupEmitter,
  deliveredListener,
};