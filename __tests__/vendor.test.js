'use strict';

const Chance = require('chance');
const chance = new Chance();

const { pickupEmitter, deliveredListener } = require('../client/vendor');


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

describe('Testing vendor client app', () => {

  test('Vendor client app emits PICKUP event with payload', () => {
    let testStoreName = 'Test store';

    pickupEmitter(socket)(testStoreName);

    expect(socket.emit).toHaveBeenCalledWith('PICKUP', 
      expect.objectContaining({
        store: testStoreName,
        orderID: expect.anything(),
        customer: expect.anything(),
        address: expect.anything(),
      }),
    );
  });

  test('Vendor client app listens for DELIVERED and logs customer', () => {
    let testPayload = { customer: chance.name()};

    deliveredListener(testPayload);

    expect(console.log).toHaveBeenCalledWith('Thank you',testPayload.customer);
  });
});