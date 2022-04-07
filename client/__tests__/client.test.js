'use strict';

const { io } = require('socket.io-client');

const Client = require('../lib/Client');

jest.mock('socket.io-client', () => {
  return {
    io: jest.fn(() => {
      return {
        on: jest.fn(),
        emit: jest.fn(),
      };
    }),
  };
});

describe('Testing the message client module', () => {
  let testClient;
  testClient = new Client('test');

  test('Should call socket functions on instantiation', () => {
    expect(io).toHaveBeenCalledWith(expect.anything());
    expect(testClient.socket.emit).toHaveBeenCalledWith('join', { queueId: 'test' });
    expect(testClient.socket.on).toBeCalled();
  });

  test('publish() method calls socket.emit() with correct arguments', () => {
    testClient.publish('testEvent', { text: 'testPayload' });
  
    const testerObject = { 
      text: 'testPayload',
      queueId: expect.anything(),
      eventName: 'testEvent',
    };
    
    expect(testClient.socket.emit)
      .toHaveBeenCalledWith('testEvent', expect.objectContaining(testerObject));
  });

  test('subscribe() method calls socket.on() with correct arguments', () => {
    let testCallback = () => console.log('Testing 1 2 3');
    testClient.subscribe('testEvent', testCallback);

    expect(testClient.socket.on).toHaveBeenCalledWith('testEvent', testCallback);
  });
});