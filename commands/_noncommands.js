const connection = require('../connection.js');

const knownNoncommands = {
  расса: Race
};

//
function Race(target, context) {
  var message = `${context.username} , https://i.imgur.com/34Q5LeS.jpg `;
  message += global.botContext.subscriber ? 'akroMongo akroVebas' : 'Poooound';
  connection.sendMessage(target, context, message);
}

module.exports = { knownNoncommands };
