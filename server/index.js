'use strict';

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = new Server(PORT);
const caps = server.of('/caps');

const addLogger = require('./event-logger');
const Queue = require('./lib/queue');

const globalQueue = new Queue();

caps.on('connection', socket => {

  addLogger(socket);

  console.log('Poggers! Socket connected!', socket.id);

  socket.on('join', (payload) => {
    // The queueIds should NOT be shared between stores
    console.log('Registering client to room ', payload.queueId);
    socket.join(payload.queueId);
  });

  socket.on('PICKUP', (payload) => {
    console.log('Relaying/storing PICKUP');

    let eventQueue = globalQueue.createIfNotExists('driver', new Queue());

    eventQueue.create(payload.messageId, payload);

    socket.to('driver').emit('PICKUP', payload);
  });

  socket.on('DELIVERED', (payload) => {
    console.log('Relaying/storing DELIVERED', payload.store);

    let eventQueue = globalQueue.createIfNotExists(payload.store, new Queue());

    eventQueue.create(payload.messageId, payload);

    socket.to(payload.queueId).emit('DELIVERED', payload);
  });

  socket.on('received', (payload) => {
    console.log('A dequeued payload has been acknowledged by a client');
    let eventQueue = globalQueue.read(payload.queueId);

    if(!eventQueue) throw new Error('Queue does not exist!');

    let message = eventQueue.remove(payload.messageId);
    console.log('Lifecycle has ended for messageId: ', payload.messageId);
    caps.emit('received', message);
  });

  socket.on('get-all', (payload) => {
    console.log('Getting all events in queueId: ', payload.queueId);
    let eventQueue = globalQueue.read(payload.queueId);

    console.log(eventQueue);

    eventQueue.readAllValues().forEach((payload) => {
      console.log('Fetched payload', payload);
      socket.emit(payload.eventName, payload);
    });
  });
});

console.log('caps.on() executed, server should be up');