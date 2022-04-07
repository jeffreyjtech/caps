'use strict';

// This module exports a Queue class
// It's purpose is to allow easier storage & retrieval of events

class Queue {
  constructor() {
    this.data = {};
  }

  create(key, value) {
    this.data[key] = value;
    return this.data[key];
  }

  read(key) {
    return this.data[key];
  }

  remove(key) {
    let value = this.data[key];
    delete this.data[key];
    return value;
  }

  readAllValues() {
    return Object.values(this.data);
  }

  hasKey(key) {
    return Boolean(this.data[key]);
  }

  createIfNotExists(key, value) {
    if (this.data[key]) {
      return this.data[key];
    } else {
      this.data[key] = value;
      return this.data[key];
    }
  }
}

module.exports = Queue;