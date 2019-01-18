const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lastseen = new Schema({
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
  }
});

lastseen.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('LastseentModel', lastseen);
