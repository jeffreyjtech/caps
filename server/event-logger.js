'use strict';

module.exports = (eventPool, event) => {
  eventPool.on(event, (payload) => {
    let timestamp = new Date();
    console.log('EVENT', {
      event: event,
      time: timestamp.toISOString(),
      payload,
    });
  });
};
