'use strict';

const crypto = require('crypto');

const eventPool = require('../event-pool');
const { handlePickup } = require('../lib/driver');

// Mock objects and spy functions
jest.mock('../event-pool', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Testing driver client app', () => {

  test('Driver client logs pickup, delivery, emits a IN-TRANSIT event, & emits a DELIVERED event', () => {

    let testPayload = { orderID: crypto.randomUUID() };

    handlePickup(testPayload);

    expect(console.log).toHaveBeenNthCalledWith(1, 'DRIVER: picked up', testPayload.orderID);
    expect(eventPool.emit).toHaveBeenNthCalledWith(1, 'IN-TRANSIT', testPayload);
    expect(console.log).toHaveBeenNthCalledWith(2, 'DRIVER: delivered', testPayload.orderID);
    expect(eventPool.emit).toHaveBeenNthCalledWith(2, 'DELIVERED', testPayload);
  });

});