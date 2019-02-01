const core = require('../index.js');
const database = require('../database');
const { EnabledCommands } = require('../config');
const utils = require('./utils.js');

var knownCommands = {};

if (EnabledCommands.Roll)
  knownCommands = Object.assign(knownCommands, { roll: Roll });

if (EnabledCommands.Lastseen)
  knownCommands = Object.assign(knownCommands, { lastseen: Lastseen });

if (EnabledCommands.FanPlayList)
  knownCommands = Object.assign(knownCommands, { fanplaylist: Playlist });

if (EnabledCommands.Question)
  knownCommands = Object.assign(knownCommands, { вопрос: Question });

knownCommands.commands = Commands;

//
function Commands(target, context, params) {
  var commands = Object.keys(knownCommands);
  var message = `${context.username} `;
  commands.forEach(command => {
    message += ', ';
    message += command != 'commands' ? `!${command} ` : '';
    if (command == 'commands') {
      message = `${message.substring(0, message.length - 2)} .`;
    }
  });
  if (message == `${context.username}  .`) return;
  core.sendMessage(target, context, message);
}

//
async function Lastseen(target, context, params) {
  if (params[0] == undefined) {
    return core.sendMessage(
      target,
      context,
      `${context.username} , input username.`
    );
  }

  params[0] = params[0].toLowerCase();

  const currentViewers = await utils.GetCurrentChtters(target.substring(1));
  if (currentViewers.indexOf(params[0]) != -1) {
    const message = `${context.username} , ${params[0]} in the chat right now.`;
    return core.sendMessage(target, context, message);
  }

  const data = await database.FindLastseen(target, params[0]);
  if (data == 'User not found') {
    const message = `${context.username} , user not found`;
    return core.sendMessage(target, context, message);
  }

  const message = `@${context.username} , ${params[0]} was here ${data}`;
  core.sendMessage(target, context, message);
}

//
function Question(target, context, params) {
  const message = `Что за аддон/макрос? Кто ща тащит на арене? Какой сервер? Зачем столько рог? Почему скилы повторяются на панели? Откуда столько золота? Все ответы здесь > https://bit.ly/2EsalNz <`;
  core.sendMessage(target, context, message);
}

//
function Roll(target, context, params) {
  const roll = Math.floor(Math.random() * 100 + 1);
  const message = `${context.username} rolls ${roll} (1-100).`;
  core.sendMessage(target, context, message);
}

//
function Playlist(target, context, params) {
  const message = `${
    context.username
  } , fan-made playlist of Akrololz\`s music you can find here > https://www.deezer.com/ru/playlist/3151230842 <`;
  core.sendMessage(target, context, message);
}

module.exports = { knownCommands };
