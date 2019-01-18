const tmi = require('tmi.js');
const config = require('./config.js');
const {
  knownCommands,
  knownModCommands,
  knownNoncommands
} = require('./commands');
const database = require('./database');
const myEvantsChannel = require('./MyEvants.js').channel;

const options = {
  options: {
    clientId: config.client_id
    // debug: true
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: config.BOTUSERNAME,
    password: config.TOKEN
  },
  channels: config.BOTSCHANNELS
};

const client = new tmi.client(options);

client.connect();

client.on('connected', onConnectedHandler);
client.on('disconnected', onDisconnectedHandler);
client.on('chat', onMessageHandler);
client.on('timeout', onTimeoutHandler);
client.on('ban', onBanHandler);
client.on('subscription', onSubscriptionHendler);
client.on('resub', onResubHandler);
client.on('join', onJoinHandler);
client.on('part', onPartHandler);

function onMessageHandler(target, context, msg, self) {
  console.log(
    `[${target} (${context['message-type']})] ${context.username}: ${msg}`
  );

  database.CreateLastseen(target, context.username);

  if (context.username == 'writebot_') {
    global.botContext = context;
  }

  const parse = msg.split(' ');

  if (msg.substr(0, 1) == '!') {
    var commandName = parse[0].slice(1).toLowerCase();
    const params = parse.splice(1);

    if (commandName in knownCommands) {
      const command = knownCommands[commandName];
      command(target, context, params);
      console.log(`* Executed ${commandName} command for ${context.username}`);
      return;
    }

    if (context.mod || `#${context.username}` == target) {
      if (commandName in knownModCommands) {
        const command = knownModCommands[commandName];
        command(target, context, params);
        console.log(
          `* Executed ${commandName} command for ${context.username}`
        );
      }
    }
    return;
  }

  parse.forEach(word => {
    if (word in knownNoncommands) {
      const noncommmand = knownNoncommands[word];
      noncommmand(target, context);
      console.log(`* Executed ${word} command for ${context.username}`);
    }
  });
}

function onSubscriptionHendler(channel, username) {
  // method, usermessage, userstate
  var message = `@${username} , thanks for the subscription! `;
  message += global.botContext.subscriber ? 'akroYo' : 'KonCha';
  database.CreateSub(channel, username, '1');
  client.say(channel, message);
}

function onResubHandler(channel, username, months) {
  // usermessage, userstate, methods
  var message = `@${username} , thanks for the resubscription for ${months} months! `;
  message += global.botContext.subscriber ? 'akroYo' : 'KonCha';
  database.CreateSub(channel, username, months);
  client.say(channel, message);
}

function onTimeoutHandler(channel, username, reason, duration) {
  var message = `@${username} на в ебас `;
  message += global.botContext.subscriber ? 'akroVebas' : 'Poooound';
  database.CreateBan(channel, username, 'timeout', reason, duration);
  client.say(channel, message);
}

function onBanHandler(channel, username, reason) {
  var message = `@${username} на в ебас `;
  message += global.botContext.subscriber ? 'akroVebas' : 'Poooound';
  database.CreateBan(channel, username, 'ban', reason, 'permanently');
  client.say(channel, message);
}

function onJoinHandler(channel, username) {
  //self
  myEvantsChannel.emit('join', channel, username);
  database.CreateLastseen(channel, username);
}

function onPartHandler(channel, username) {
  //self
  myEvantsChannel.emit('part', channel, username);
  database.CreateLastseen(channel, username);
}

function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function onDisconnectedHandler(reason) {
  console.log(`Disconnected: ${reason}`);
  process.exit(1);
}

exports.sendMessage = function(target, context, message) {
  if (context['message-type'] === 'whisper') {
    client.whisper(target, message);
  } else {
    client.say(target, message);
  }
};
