'use strict';

// Since the two vendors had identical code, I created an extension of Client

const crypto = require('crypto');

const Client = require('./Client');

class VendorClient extends Client {
  constructor(vendorId) {
    super(vendorId);
    this.vendorId = vendorId;
  }

  publishOrder(order) {
    super.publish('PICKUP', {
      ...order,
      messageId: crypto.randomUUID(),
      store: this.vendorId,
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