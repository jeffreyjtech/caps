# Code Academy Parcel Service (CAPS)

A real-time service that allows for vendors, such as flower shops or restaurants, to alert a system of a package needing to be delivered, for drivers to instantly see what’s in their pickup queue, and then to alert the vendors as to the state of the deliveries (in transit, and then delivered).

As of Lab 16, you can install the client applications to simulate delivery pickups and fulfillments using either of the AWS-deployed servers.

[**Deployed Server (AWS GUI)**](http://capsbeanstalkgui-env.eba-mxgvpqyg.us-west-2.elasticbeanstalk.com/caps)

[**Deployed Server (AWS CLI)**](http://caps-beanstalk-cli-env.eba-caumpsuf.us-west-2.elasticbeanstalk.com/caps)

## UML

![Lab 13 UML diagram](./assets/lab-13-uml.jpg)

## Installation

### Server Installation

1. Clone from this repo `git clone https://github.com/jeffreyjtech/caps.git`
2. `cd` into `caps/server`
3. Run `npm install`
4. Optionally, create an .env file with `PORT=<!--my favorite port number-->`
    - If not specified, the server will use port 3000.

### Client Installation

1. Clone from this repo `git clone https://github.com/jeffreyjtech/caps.git`
2. `cd` into `caps/client`
3. Run `npm install`
4. Optionally, create an env file with `SOCKET_URL=<!--intended server URL-->`.
    - The two deployed server URLs are
      - `http://capsbeanstalkgui-env.eba-mxgvpqyg.us-west-2.elasticbeanstalk.com/caps`
      - `http://caps-beanstalk-cli-env.eba-caumpsuf.us-west-2.elasticbeanstalk.com/caps`
    - If not specified, the client applications will connect to `https://localhost:3000/caps`

## Usage

### Server usage

Run `npm start` from either the root directory `caps` or the `caps/server` folder to start the server.

### Client usage

1. `cd` into `caps/client`
1. Run `node vendor.js` to send `'PICKUP'` events to the server, simulating 2 vendors sending off 1 parcel each
1. Run `node driver.js` to receive those `'PICKUP'` events and simulate a driver picking up and delivering parcels, sending back `'DELIVERY'` events.

## Contributors / Authors

- Jeffrey Jenkins

## Features / Routes

The server uses Socket.io to process `'PICKUP'` and `'DELIVERY'` events from the client applications.

- The `'PICKUP'` event requires a payload with order information from the vendor and the sender's `queueId` (must be the same as the vendor's name).
- The `'DELIVERY'` event indicates a driver has delivered a parcel, and the payload must have the `'driver'` `queueId`.

## Old UML Diagrams

### Lab 11

![Lab 11 UML diagram](./assets/lab-11-uml.jpg)

### Lab 12

![Lab 12 UML diagram](./assets/lab-12-uml.jpg)
