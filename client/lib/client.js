'use strict';

// This module contains a class for abstracting a client application for our CAPS system
// On instantiation, the new MessageClient will emit a 'join' event.
// The server app will join the new Client to a room named after the queueId upon receipt of the 'join' event.

const { io } = require('socket.io-client');
const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3000/caps';

class MessageClient {
  constructor(queueId) {
    this.queueId = queueId;
    this.socket = io(SOCKET_URL);
    this.socket.emit('join', { queueId });
    this.socket.on('join', (id) => console.log('Joined queue with id:\n ', id));
  }

  publish(event, payload) {
    this.socket.emit(event, { ...payload, eventName: event, queueId: this.queueId });
  }

  subscribe(event, callback) {
    this.socket.on(event, callback);
  }
}

module.exports = MessageClient;