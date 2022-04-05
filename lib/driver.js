'use strict';

const eventPool = require('../event-pool');

module.exports = {
  handlePickup: (payload) => {
    console.log('DRIVER: picked up', payload.orderID);
    eventPool.emit('IN-TRANSIT', payload);
    console.log('DRIVER: delivered', payload.orderID);
    eventPool.emit('DELIVERED', payload);
  },
};
