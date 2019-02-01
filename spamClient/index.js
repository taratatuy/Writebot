const tmi = require('tmi.js');
const eventEmitter = require('events').EventEmitter;
const readline = require('readline');
const myBots = require('./myBots.js');

var spamClient = function(channel) {
  this.channel = channel;
  this.myClients = [];
  this.myConnections = [];

  this.createClients();
};

spamClient.prototype.__proto__ = eventEmitter.prototype;

spamClient.prototype.createClients = async function createClients() {
  var options = null;
  myBots.forEach(bot => {
    options = getOptions(bot);
    this.myClients.push(new tmi.client(options));
  });
  await this.createConnections();
  return;
};

spamClient.prototype.createConnections = async function createConnections() {
  this.myClients.forEach(client => {
    client.connect();
    client.on('connected', () => {
      client.connected = true;
      // console.log(client.opts.identity.username, 'CONNECTED!');
      this.myConnections.push(client);
      progressBar(
        this.myConnections.length,
        this.myClients.length,
        'Connected'
      );
      this.emit('connected');
    });
    client.on('disconnected', () => {
      client.connected = false;
      console.log(client.opts.identity.username, 'DISCONNECTED!');
      this.myConnections.splice(this.myConnections.indexOf(client), 1);
      this.emit('disconnected');
    });
  });
  return;
};

spamClient.prototype.sendMessage = function sendMessage(count, message) {
  var randomMass = [];
  for (i = 0; i < this.myConnections.length; i++) {
    randomMass.push(i);
  }
  console.log();

  count = randomMass.length > count ? count : randomMass.length;
  var itr = 0;
  this.sendOne = function() {
    setTimeout(() => {
      if (itr < count) {
        itr++;
        var randomCount = Math.floor(Math.random() * (randomMass.length - 1));
        var index = randomMass[randomCount];
        randomMass.splice(randomCount, 1);
        if (this.myConnections[index] != undefined) {
          progressBar(itr, count, 'Done');
          this.myConnections[index].say(this.channel, message);
        }
        this.sendOne();
      }
    }, 500);
  };

  this.sendOne();
};

function getOptions(currentBot) {
  return {
    identity: {
      username: currentBot.name,
      password: currentBot.token
    }
  };
}

function progressBar(current, all, text) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  let output = `${text} ... ${current}/${all}`;
  process.stdout.write(output);
}

module.exports = spamClient;
