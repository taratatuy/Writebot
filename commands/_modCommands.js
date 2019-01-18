const connection = require('../connection.js');
const database = require('../database');

const knownModCommands = {
  baninfo: BanInfo,
  hello: Hello
};

//
async function BanInfo(target, context, params) {
  if (params[0] == undefined) {
    return connection.sendMessage(
      target,
      context,
      `${context.username} , input username.`
    );
  }

  params[0] = params[0].toLowerCase();

  const banInfo = await database.FindBan(target, params[0]);
  if (banInfo == 'User not found') {
    const message = `${context.username} , user not found`;
    return connection.sendMessage(target, context, message);
  }

  const message = `@${context.username} , User: ${params[0]} , Ban time: ${
    banInfo.time
  } , Ban duration: ${banInfo.banDuration} ,  Timed out ${
    banInfo.count
  } times ,  Timed out totally: ${banInfo.totally}`;
  connection.sendMessage(target, context, message);
}

//
function Hello(target, context, params) {
  const message = 'OLOLO';
  connection.sendMessage(target, context, message);
}

module.exports = { knownModCommands };
