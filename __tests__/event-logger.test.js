'use strict';

const Chance = require('chance');
const crypto = require('crypto');
const chance = new Chance();

const addLogger = require('../lib/event-logger.js');
const eventPool = require('../event-pool');

// Mock objects and spy functions
jest.mock('../event-pool', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();
// jest.spyOn(console, 'log');

describe('Testing event logger', () => {

  test('Checking logger logs an event with eventName and payload', () => {
    let testPayload = {
      store: chance.company(),
      orderID: crypto.randomUUID(),
      customer: chance.name(),
      address: chance.address(),
    };
    let testEventName = 'PICKUP';
    addLogger(eventPool, testEventName);

    // The next line stores the arguments when eventPool.on() was called
    // .mock is the mock property provided by jest, which then has a .calls property which is an array
    // the .calls array contains sub-arrays of each argument for each call of .on()
    let [ mockCall ] = eventPool.on.mock.calls;

    // This finds the callback so we can test it
    let loggerCallback = mockCall.find((argument) => typeof argument === 'function');

    // Then we execute the callback to see that it calls console.log in some capacity
    loggerCallback(testPayload);
    expect(console.log).toBeCalled();
    // Finally we test that 'PICKUP' was also among the arguments
    expect(mockCall.find((argument) => argument === testEventName)).toBeTruthy();
  });
});
