'use strict';

const Chance = require('chance');
const chance = new Chance();
const crypto = require('crypto');

const Client = require('./lib/client');
const vendorClient = new Client('1-800-flowers');

vendorClient.publish('PICKUP', {
  messageId: crypto.randomUUID(),
  store: '1-800-flowers',
  orderID: crypto.randomUUID(),
  customer: chance.name(),
  address: chance.address(),
});

vendorClient.publish('get-all', { eventName: 'DELIVERED', queueId: '1-800-flowers' });

vendorClient.subscribe('DELIVERED', (payload) => {
  console.log('Thank you', payload.customer);
  vendorClient.publish('received', payload);
});

module.exports = vendorClient;