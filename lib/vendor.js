'use strict';

const Chance = require('chance');
const chance = new Chance();

const eventPool = require('../hub');

module.exports = {
  pickupEmitter: (payload) => {
    let newOrderPayload = {
      store: payload,
      orderID: process.env.TEST_orderID || crypto.randomUUID(),
      customer: process.env.TEST_customer || chance.name(),
      address: process.env.TEST_address || chance.address(),
    };
    eventPool.emit('PICKUP', newOrderPayload);  
  },

  deliveredListener: (payload) => {
    console.log('Thank you', payload.customer);
  },
};
