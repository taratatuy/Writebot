const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root('.env') });

const EnabledCommands = {
  BanMessage: true,
  Roll: true,
  Lastseen: true,
  FanPlayList: true,
  Question: true,
  BanInfo: true,
  LinkSaving: true,
  Race: true
};

const BotAuthData = {
  Username: process.env.BOTUSERNAME,
  Channels: ['#writebot_'],
  Port: process.env.PORT || 3000,
  client_id: process.env.client_id,
  client_secret: process.env.client_secret,
  Token: process.env.TOKEN,
  MongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/WriteBot'
};

module.exports = {
  EnabledCommands,
  BotAuthData
};

global.botContext = {
  mod: true,
  subscriber: true
};
