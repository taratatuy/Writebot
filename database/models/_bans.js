const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ban = new Schema({
  channel: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  banReason: {
    type: String,
    required: true
  },
  banDuration: {
    type: String,
    required: true
  },
  totally: {
    type: String,
    required: true
  },
  count: {
    type: String,
    required: true
  }
});

ban.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('BanModel', ban);
