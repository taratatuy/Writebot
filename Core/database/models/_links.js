const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const link = new Schema({
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
  message: {
    type: String,
    required: true
  }
});

link.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('LinkModel', link);
