'use strict';

module.exports = (socket, event) => {
  socket.on(event, (payload) => {
    let timestamp = new Date();
    console.log('EVENT', {
      event: event,
      time: timestamp.toISOString(),
      payload,
    });
  });
};
