'use strict';

const Chance = require('chance');
const chance = new Chance();

const eventPool = require('../event-pool');
const { pickupEmitter, deliveredListener } = require('../lib/vendor');

// Mock objects and spy functions
jest.mock('../event-pool', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Testing vendor client app', () => {

  test('Vendor client app emits PICKUP event with payload', () => {
    let testPayload = chance.company();

    pickupEmitter(testPayload);

    expect(eventPool.emit).toHaveBeenCalledWith('PICKUP', 
      expect.objectContaining({
        store: testPayload,
        orderID: expect.anything(),
        customer: expect.anything(),
        address: expect.anything(),
      }),
    );
  });

  test('Vendor client app listens for DELIVERED and logs customer', () => {
    let testCustomer = chance.name();

    deliveredListener({ customer: testCustomer });

    expect(console.log).toHaveBeenCalledWith('Thank you',testCustomer);
  });
});