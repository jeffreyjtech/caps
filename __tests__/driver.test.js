'use strict';

const crypto = require('crypto');

const { handlePickup } = require('../client/driver');

// Mock objects and spy functions
const socket = {
  emit: jest.fn(),
  on: jest.fn(),
};

// Even though we're only testing handlePickup, JavaScript will still try to compile the rest of the "driver" file
// Hence we need to mock the socket.io-client dependency with a mock function called "io"
jest.mock('socket.io-client', () => {
  return {
    io: () => ({ emit: jest.fn(), on: jest.fn() }),
  };
});

console.log = jest.fn();

describe('Testing driver client app', () => {

  test('Driver client logs pickup, delivery, emits a IN-TRANSIT event, & emits a DELIVERED event', () => {

    let testPayload = { orderID: crypto.randomUUID() };

    handlePickup(socket)(testPayload);

    expect(console.log).toHaveBeenNthCalledWith(1, 'DRIVER: picked up', testPayload.orderID);
    expect(socket.emit).toHaveBeenNthCalledWith(1, 'IN-TRANSIT', testPayload);
    expect(console.log).toHaveBeenNthCalledWith(2, 'DRIVER: delivered', testPayload.orderID);
    expect(socket.emit).toHaveBeenNthCalledWith(2, 'DELIVERED', testPayload);
  });

});