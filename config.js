const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root('.env') });

module.exports = {
  BOTUSERNAME: process.env.BOTUSERNAME,
  BOTSCHANNELS: ['#writebot_'],
  PORT: process.env.PORT || 3000,
  client_id: process.env.client_id,
  client_secret: process.env.client_secret,
  // current_connection: '',
  TOKEN: process.env.TOKEN,

  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/WriteBot'
};

global.botContext = {
  mod: true,
  subscriber: true
};
