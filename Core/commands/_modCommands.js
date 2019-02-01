const core = require('../index.js');
const database = require('../database');
const { EnabledCommands } = require('../config');

var knownModCommands = {};

if (EnabledCommands.BanInfo)
  knownModCommands = Object.assign(knownModCommands, { baninfo: BanInfo });

//
async function BanInfo(target, context, params) {
  if (params[0] == undefined) {
    return core.sendMessage(
      target,
      context,
      `${context.username} , input username.`
    );
  }

  params[0] = params[0].toLowerCase();

  const banInfo = await database.FindBan(target, params[0]);
  if (banInfo == 'User not found') {
    const message = `${context.username} , user not found`;
    return core.sendMessage(target, context, message);
  }

  const message = `@${context.username} , User: ${params[0]} , Ban time: ${
    banInfo.time
  } , Ban duration: ${banInfo.banDuration} ,  Timed out ${
    banInfo.count
  } times ,  Timed out totally: ${banInfo.totally}`;
  core.sendMessage(target, context, message);
}

module.exports = { knownModCommands };
