'use strict';

const Chance = require('chance');
const crypto = require('crypto');
const chance = new Chance();

const eventLogger = require('../lib/event-logger.js');


// Mock objects and spy functions
console.log = jest.fn();
// jest.spyOn(console, 'log');

describe('Testing event logger', () => {
  

  test('Checking that it logs an event with eventName and payload', () => {
    // `EVENT:\n ${eventName}:\n ${timestamp},\n ${payload}`
    let testPayload = {
      store: chance.company(),
      orderID: crypto.randomUUID(),
      customer: chance.name(),
      address: chance.address(),
    };
    let testEventName = 'PICKUP';
    // timestamp has to be generated last so the test passes.
    let timestamp = new Date();

    let printObject = {
      EVENT:{
        event: testEventName,
        time: timestamp.toISOString(),
        payload: testPayload,
      },
    };

    eventLogger(testPayload, testEventName);

    expect(console.log).toHaveBeenCalledWith(printObject);
  });
});