var cleverbot = require("cleverbot.io")
var os = require('os')
var config = require('../config.js')

cleverbot = new cleverbot(config.cleverbot.api_user, config.cleverbot.api_key);

cleverbot.setNick("@coffeemachine");
cleverbot.create(function (err, session) {
  if (err) {
    console.log('cleverbot create fail.');
  } else {
    console.log('cleverbot create success.');
  }
});

module.exports = function (controller) {

  //add "when was the latest brew?"

  controller.hears('','direct_message,direct_mention,mention',function(bot,message) {
    var msg = message.text;
    cleverbot.ask(msg, function (err, response) {
      if (!err) {
        bot.reply(message, response);
      } else {
        console.log('cleverbot err: ' + err);
      }
    });
  })
}
