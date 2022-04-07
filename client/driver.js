'use strict';

const Client = require('./lib/Client');
const driverClient = new Client('driver');

console.log('Fetching events from server');
driverClient.publish('get-all', { eventName: 'PICKUP', queueId: 'driver' });

driverClient.subscribe('PICKUP', (payload) => {
  console.log('DRIVER: picked up', payload.orderID);
  driverClient.publish('received', payload);
  driverClient.publish('IN-TRANSIT', payload);
  console.log('DRIVER: delivered', payload.orderID);
  driverClient.publish('DELIVERED', payload);
});

module.exports = driverClient;
