const { BotAuthData } = require('../config');
const mongoose = require('mongoose');
const models = require('./models');

new Promise((resolve, reject) => {
  mongoose.Promise = global.Promise;

  mongoose.connection
    .on('error', error => console.log(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
      const info = mongoose.connections[0];
      console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    });

  mongoose.connect(
    BotAuthData.MongoUrl,
    { useNewUrlParser: true }
  );
}).catch(err => {
  console.log('Database connection Error:', err);
});

function CreateLastseen(channel, name) {
  models.lastseen
    .update(
      {
        channel: channel,
        name: name
      },
      {
        channel: channel,
        name: name,
        time: TimeFormating(new Date())
      },
      { upsert: true }
    )
    .catch(err => {
      console.log('DB lastseen create error:', err);
    });
}

function CreateTimeLastseen(channel, name, time) {
  return models.lastseen
    .update(
      {
        channel: channel,
        name: name
      },
      {
        channel: channel,
        name: name,
        time: time
      },
      { upsert: true }
    )
    .catch(err => {
      console.log('DB lastseen create error:', err);
    });
}

function FindLastseen(channel, name) {
  return models.lastseen
    .findOne({
      channel: channel,
      name: name
    })
    .then(data => {
      if (data == null) {
        return 'User not found';
      } else {
        return data.time;
      }
    })
    .catch(err => {
      console.log('DB lastseen find error:', err);
      return 'User not found';
    });
}

async function CreateBan(channel, name, action, banReason, banDuration) {
  const banInfo = await FindBan(channel, name);
  if (banInfo != 'User not found') {
    count = +banInfo.count + 1;
    if (banDuration != 'permanently') {
      totally = +banInfo.totally + banDuration;
    } else {
      totally = banInfo.totally;
    }
  } else {
    var count = 1;
    var totally = banDuration;
  }

  models.bans
    .update(
      {
        channel: channel,
        name: name
      },
      {
        channel: channel,
        name: name,
        time: TimeFormating(new Date()),
        action: action,
        banReason: banReason,
        banDuration: banDuration,
        totally: totally,
        count: count
      },
      { upsert: true }
    )
    .catch(err => {
      console.log('DB ban create error:', err);
    });
}

function FindBan(channel, name) {
  return models.bans
    .findOne({
      channel: channel,
      name: name
    })
    .then(data => {
      if (data == null) {
        return 'User not found';
      } else {
        return data;
      }
    })
    .catch(err => {
      console.log('DB ban find error:', err);
      return 'User not found';
    });
}

function CreateSub(channel, name, streak) {
  models.subscribers
    .update(
      {
        channel: channel,
        name: name
      },
      {
        channel: channel,
        name: name,
        time: TimeFormating(new Date()),
        streak: streak
      },
      { upsert: true }
    )
    .catch(err => {
      console.log('DB sub create error:', err);
    });
}

function CreateLink(channel, name, message) {
  models.links
    .create({
      channel: channel,
      name: name,
      time: TimeFormating(new Date()),
      message: message
    })
    .catch(err => {
      console.log('DB link create error:', err);
    });
}

function TimeFormating(time) {
  return `${time.getDate()}.${time.getMonth() +
    1}.${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
}

module.exports = {
  CreateLastseen,
  CreateBan,
  CreateSub,
  FindLastseen,
  FindBan,
  CreateTimeLastseen,
  CreateLink
};
