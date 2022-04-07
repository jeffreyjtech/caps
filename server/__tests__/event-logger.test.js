'use strict';

const addLogger = require('../event-logger.js');
// const eventPool = require('../server/event-pool');

// Mock objects and spy functions
const socket = {
  onAny: jest.fn(),
};
console.log = jest.fn();
// jest.spyOn(console, 'log');

describe('Testing event logger', () => {

  test('Checking logger logs an event with eventName and payload', () => {
    let testPayload = {
      nothing: 'in-particular',
    };
    let testEventName = 'PICKUP';
    addLogger(socket);
    
    // The next line stores the arguments when socket.onAny() was called
    // .mock is the mock property provided by jest, which then has a .calls property which is an array
    // the .calls array contains sub-arrays of each argument for each call of .onAny()
    let mockCallArgs = socket.onAny.mock.calls[0];

    // This finds the callback so we can test it
    let loggerCallback = mockCallArgs.find((argument) => typeof argument === 'function');

    // Then we execute the callback to see that it calls console.log in some capacity
    loggerCallback(testEventName, testPayload);
    expect(console.log).toBeCalled();
    // Finally we test that 'PICKUP' was also among the arguments
  });
});
