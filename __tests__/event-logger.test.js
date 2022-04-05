'use strict';

const Chance = require('chance');
const crypto = require('crypto');
const chance = new Chance();

const addLogger = require('../lib/event-logger.js');
const eventPool = require('../event-pool');

// Mock objects and spy functions
console.log = jest.fn();
// jest.spyOn(console, 'log');

describe('Testing event logger', () => {

  test('Checking logger logs an event with eventName and payload', () => {
    // `EVENT:\n ${eventName}:\n ${timestamp},\n ${payload}`
    let testPayload = {
      store: chance.company(),
      orderID: crypto.randomUUID(),
      customer: chance.name(),
      address: chance.address(),
    };
    let testEventName = 'PICKUP';
    // timestamp has to be generated last so the test passes.
    // let timestamp = new Date();

    addLogger(eventPool, testEventName);

    let listener = eventPool.listeners(testEventName)[0];

    listener(testPayload);

    expect(console.log).toBeCalled();
  });
});
