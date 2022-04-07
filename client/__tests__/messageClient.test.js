'use strict';

const { io } = require('socket.io-client');

const MessageClient = require('../lib/messageClient');

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

  test('Should call socket functions on instantiation', () => {
    testClient = new MessageClient('test');
    expect(io).toHaveBeenCalledWith(expect.anything());
    expect(testClient.socket.emit).toHaveBeenCalledWith('join', { queueId: 'test' });
    expect(testClient.socket.emit).toBeCalled();
  });
});