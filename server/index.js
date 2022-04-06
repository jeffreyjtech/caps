'use strict';

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = new Server(PORT);
const caps = server.of('/caps');

caps.on('connection', socket => {

});

console.log('caps.on() executed, server should be up');