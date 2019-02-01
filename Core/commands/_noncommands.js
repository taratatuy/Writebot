const core = require('../index.js');
const database = require('../database');
const { EnabledCommands } = require('../config');

var knownNoncommands = {};

const raceWords = {
  расса: Race,
  рассу: Race,
  рассы: Race,
  рассе: Race,
  субрасса: Race,
  субрассу: Race,
  субрассы: Race,
  субрассе: Race,
  рассовая: Race,
  рассовую: Race,
  рассовый: Race,
  рассовые: Race
};

if (EnabledCommands.Race)
  knownNoncommands = Object.assign(knownNoncommands, raceWords);

if (EnabledCommands.LinkSaving)
  knownNoncommands = Object.assign(knownNoncommands, { http: LinkSaving });

//
function Race(target, context) {
  var message = `${context.username} , https://i.imgur.com/34Q5LeS.jpg `;
  message += global.botContext.subscriber ? 'akroMongo akroVebas' : 'Poooound';
  core.sendMessage(target, context, message);
}

//
const linkExeptiond = [
  'https://i.imgur.com/34Q5LeS.jpg',
  'https://vk.com/akrololz'
];

function LinkSaving(target, context, msg) {
  if (context.username == 'nightbot' || context.username == 'moobot') return;
  for (let link of linkExeptiond) {
    if (msg.includes(link)) return;
  }

  database.CreateLink(target, context.username, msg);
}

module.exports = { knownNoncommands };
