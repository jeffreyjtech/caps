'use strict';

module.exports = (socket) => {
  socket.onAny((eventName, payload) => {
    let timestamp = new Date();
    console.log('EVENT', {
      event: eventName,
      time: timestamp.toISOString(),
      payload,
    });
  });
};
