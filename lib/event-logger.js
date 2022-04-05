'use strict';

const logEvent = (payload, eventName) => {
  let timestamp = new Date();
  console.log('EVENT', {
    event: eventName,
    time: timestamp.toISOString(),
    payload,
  });
};

// Exporting function for testing.
module.exports = (payload, eventName) => logEvent(payload, eventName);