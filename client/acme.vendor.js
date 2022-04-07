'use strict';

const Chance = require('chance');
const chance = new Chance();
const crypto = require('crypto');

const Client = require('./lib/client');
const vendorClient = new Client('acme-widgets');

vendorClient.publish('PICKUP', {
  messageId: crypto.randomUUID(),
  store: 'acme-widgets',
  orderID: crypto.randomUUID(),
  customer: chance.name(),
  address: chance.address(),
});

vendorClient.subscribe('get-all', (payload) => {
  console.log('Fetching events from server');
  vendorClient.publish('received', payload);
});

vendorClient.subscribe('DELIVERED', (payload) => {
  console.log('Thank you', payload.customer);
  vendorClient.publish('received', payload);
});

module.exports = vendorClient;