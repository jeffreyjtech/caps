'use strict';

const Queue = require('../lib/queue');

describe('Testing the Queue class', () => {
  let testQueue = new Queue();
  test('Store one key-value pair', () => {
    testQueue.create('Sussy', 'amogus');
  });

  test('Read that key-value pair', () => {
    expect(testQueue.read('Sussy')).toBe('amogus');
  });

  test('Remove the key-value pair, then return undefined if we read it afterwards', () => {
    expect(testQueue.remove('Sussy')).toBe('amogus');
    expect(testQueue.read('Sussy')).toBeFalsy();
  });

  test('readAllValues() returns an array of values', () => {
    testQueue.create('k1', 1);
    testQueue.create('k2', 2);
    testQueue.create('k3', 3);

    expect(testQueue.readAllValues()).toEqual([1,2,3]);
  });

  test('createIfNotExists() creates & returns a new key-value pair', () => {

    expect(testQueue.createIfNotExists('dont erase me', 'pls')).toBe('pls');
  });

  test('createIfNotExists() returns an existing key-value pair, ignoring the value argument', () => {

    expect(testQueue.createIfNotExists('dont erase me', 'BUT I CAN TRY')).toBe('pls');
  });
});