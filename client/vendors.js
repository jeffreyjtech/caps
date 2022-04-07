'use strict';

const VendorClient = require('./lib/VendorClient');

const acmeVendor = new VendorClient('acme-widgets');

acmeVendor.publishOrder();
acmeVendor.getStoredDeliveries();
acmeVendor.subscribeDeliveries();

const flowersVendor = new VendorClient('1-800-flowers');

flowersVendor.publishOrder();
flowersVendor.getStoredDeliveries();
flowersVendor.subscribeDeliveries();
