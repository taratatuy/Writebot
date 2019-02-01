const request = require('request');

exports.GetCurrentChtters = function(channel) {
  return new Promise((resolve, reject) => {
    request(
      `http://tmi.twitch.tv/group/user/${channel}/chatters`,
      { json: true },
      (err, res, data) => {
        if (err) {
          reject(err);
        } else {
          var output = data.chatters.moderators;
          output = output.concat(data.chatters.staff);
          output = output.concat(data.chatters.admins);
          output = output.concat(data.chatters.global_mods);
          output = output.concat(data.chatters.viewers);

          resolve(output);
        }
      }
    );
  });
};
