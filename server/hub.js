'use strict';

const Chance = require('chance');
const chance = new Chance();

const eventPool = require('./event-pool');
const addLogger = require('./lib/event-logger');
const { handlePickup } = require('./lib/driver');
const { pickupEmitter, deliveredListener } = require('./lib/vendor');

addLogger(eventPool, 'PICKUP');
addLogger(eventPool, 'IN-TRANSIT');
addLogger(eventPool, 'DELIVERED');

eventPool.on('PICKUP', handlePickup);
eventPool.on('DELIVERED', deliveredListener);

setInterval(() => {
  let randomStore = chance.company();
  pickupEmitter(randomStore);
}, 3000);