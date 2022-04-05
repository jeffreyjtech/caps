'use strict';

const eventPool = require('../hub');

const logEvent = (payload, eventName) => {
  let timestamp = new Date();
  let printObject = {
    EVENT:{
      event: eventName,
      time: timestamp.toISOString(),
      payload,
    },
  };
  console.log(printObject);
};

eventPool.on('PICKUP', (payload) => logEvent(payload, 'PICKUP'));
eventPool.on('IN-TRANSIT', (payload) => logEvent(payload, 'IN-TRANSIT'));
eventPool.on('DELIVERED', (payload) => logEvent(payload, 'DELIVERED'));

// Exporting function for testing.
module.exports = (payload, eventName) => logEvent(payload, eventName);