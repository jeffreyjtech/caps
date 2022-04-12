'use strict';

const { Server } = require('socket.io');

require('dotenv').config();
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
    // Since the driver wants to see all PICKUPs, we'll create/grab the driver queue
    let eventQueue = globalQueue.createIfNotExists('driver', new Queue());
    // Store the payload, using the messageId as a key
    eventQueue.create(payload.messageId, payload);
    // Now emit the pickup to the driver room
    socket.to('driver').emit('PICKUP', payload);
  });

  socket.on('DELIVERED', (payload) => {
    console.log('Relaying/storing DELIVERED', payload.store);
    // THANKFULLY the queueId is also the store property on the payload
    // The driver Client overwrites the queueId automatically with 'driver'
    // Using payload.store puts the DELIVERED event into the correct vendorQueue
    let eventQueue = globalQueue.createIfNotExists(payload.store, new Queue());
    // Store the payload
    eventQueue.create(payload.messageId, payload);
    // Emit the payload to the correct vendor's room
    socket.to(payload.store).emit('DELIVERED', payload);
  });

  socket.on('received', (payload) => {
    let eventQueue = globalQueue.read(payload.queueId);

    if(!eventQueue) throw new Error('Queue does not exist!');

    let message = eventQueue.remove(payload.messageId);
    console.log('Lifecycle has ended for messageId: ', payload.messageId);
    caps.emit('received', message);
  });

  socket.on('get-all', (payload) => {
    console.log('Getting all events in queueId: ', payload.queueId);

    let eventQueue = globalQueue.read(payload.queueId);

    if(!eventQueue) {
      console.error('  No queue found for queueId: ', payload.queueId);
    } else {
      eventQueue.readAllValues().forEach((payload) => {
        socket.emit(payload.eventName, payload);
      });    
    }
  });
});

console.log('caps.on() executed, server should be up');