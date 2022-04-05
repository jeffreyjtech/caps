'use strict';

const crypto = require('crypto');
const Chance = require('chance');
const chance = new Chance();

const eventPool = require('../hub');
const { pickupEmitter, deliveredListener } = require('../lib/vendor');

// Mock objects and spy functions
jest.mock('../hub.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Vendor client app tests', () => {

  test('Vendor client app emits PICKUP event with payload', () => {
    let testPayload = chance.company();

    process.env.TEST_orderID = crypto.randomUUID();
    process.env.TEST_customer = chance.name();
    process.env.TEST_address = chance.address();

    pickupEmitter(testPayload);

    expect(eventPool.emit).toHaveBeenCalledWith('PICKUP', {
      store: testPayload,
      orderID: process.env.TEST_orderID,
      customer: process.env.TEST_customer,
      address: process.env.TEST_address,
    });
  });

  test('Vendor client app listens for DELIVERED and logs customer', () => {
    let testCustomer = chance.name();

    deliveredListener({ customer: testCustomer });

    expect(console.log).toHaveBeenCalledWith(testCustomer);
  });
});