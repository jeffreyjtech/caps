'use strict';

const Chance = require('chance');
const chance = Chance();
const crypto = require('crypto');

const VendorClient = require('./lib/Vendor.Client');

const acmeVendor = new VendorClient('acme-widgets');

acmeVendor.publishOrder({
  orderID: crypto.randomUUID(),
  customer: chance.name(),
  address: chance.address(),
});
acmeVendor.getStoredDeliveries();
acmeVendor.subscribeDeliveries();

const flowersVendor = new VendorClient('1-800-flowers');

flowersVendor.publishOrder({
  orderID: crypto.randomUUID(),
  customer: chance.name(),
  address: chance.address(),
});
flowersVendor.getStoredDeliveries();
flowersVendor.subscribeDeliveries();
