const EventEmitter = require('events').EventEmitter;
const channel = new EventEmitter();

// channel.on('join', (channel, username) => {
//   console.log(username, 'has joined', channel);
// });

// channel.on('part', (channel, username) => {
//   console.log(username, 'has part', channel);
// });

module.exports = { channel };
