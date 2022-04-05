'use strict';

const Chance = require('chance');
const chance = new Chance();
const crypto = require('crypto');

const eventPool = require('../event-pool');

module.exports = {
  pickupEmitter: (payload) => {
    let newOrderPayload = {
      store: payload,
      orderID: crypto.randomUUID(),
      customer: chance.name(),
      address: chance.address(),
    };
    eventPool.emit('PICKUP', newOrderPayload);  
  },

  deliveredListener: (payload) => {
    console.log('Thank you', payload.customer);
  },
};
