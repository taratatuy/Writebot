const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sub = new Schema({
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
  streak: {
    type: String,
    required: true
  }
});

sub.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('SubModel', sub);
