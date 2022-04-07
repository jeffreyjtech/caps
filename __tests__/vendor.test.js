'use strict';

const Chance = require('chance');
const chance = new Chance();

const { emitJoin, emitPickup, handleDelivered } = require('../client/vendor');


// Mock objects and spy functions
const socket = {
  emit: jest.fn(),
  on: jest.fn(),
};
jest.mock('socket.io-client', () => {
  return {
    io: jest.fn(() => ({ emit: jest.fn(), on: jest.fn() })),
  };
});
console.log = jest.fn();

describe('Testing vendor client app', () => {
  test('Vendor client emits a JOIN', () => {
    emitJoin(socket);

    expect(socket.emit).toHaveBeenCalledWith('JOIN', expect.anything());
  });

  test('Vendor client app emits PICKUP event with payload', () => {
    let testStoreName = 'Test store';

    emitPickup(socket, testStoreName);

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
    const testPayload = { customer: chance.name()};

    handleDelivered(socket);

    const mockFunctionArgs = socket.on.mock.calls[0];
    let loggerCallback = mockFunctionArgs.find((argument) => typeof argument === 'function');

    loggerCallback(testPayload);

    expect(console.log).toHaveBeenCalledWith('Thank you', testPayload.customer);
  });
});