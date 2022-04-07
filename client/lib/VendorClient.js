'use strict';

const Chance = require('chance');
const chance = new Chance();
const crypto = require('crypto');

const Client = require('./Client');

class VendorClient extends Client {
  constructor(vendorId) {
    super(vendorId);
    this.vendorId = vendorId;
  }

  publishOrder() {
    super.publish('PICKUP', {
      messageId: crypto.randomUUID(),
      store: this.vendorId,
      orderID: crypto.randomUUID(),
      customer: chance.name(),
      address: chance.address(),
    });
  }

  getStoredDeliveries() {
    super.publish('get-all', { eventName: 'DELIVERED', queueId: this.vendorId });
  }

  subscribeDeliveries() {
    super.subscribe('DELIVERED', (payload) => {
      console.log('Thank you', payload.customer);
      super.publish('received', payload);
    });
  }
}

module.exports = VendorClient;