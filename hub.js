'use strict';

const Chance = require('chance');
const chance = new Chance();

const eventPool = require('./event-pool');
const logEvent = require('./lib/event-logger');
const { handlePickup } = require('./lib/driver');
const { pickupEmitter, deliveredListener } = require('./lib/vendor');

eventPool.on('PICKUP', (payload) => logEvent(payload, 'PICKUP'));
eventPool.on('IN-TRANSIT', (payload) => logEvent(payload, 'IN-TRANSIT'));
eventPool.on('DELIVERED', (payload) => logEvent(payload, 'DELIVERED'));

eventPool.on('PICKUP', handlePickup);
eventPool.on('DELIVERED', deliveredListener);


setInterval(() => {
  let randomStore = chance.company();
  pickupEmitter(randomStore);
}, 3000);