const eventEmitter = require('events').EventEmitter;
const channel = new eventEmitter();

module.exports = channel;
