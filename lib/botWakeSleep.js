var Botkit = require('botkit')
var config = require('../config.js')
var bot = require('../lib/bot.js')

var controller = Botkit.slackbot({
  debug: false
});

module.exports = function (action, token) {
  if (action == 'wake') {
    if (token == config.slack.wake_token) {
      console.log('Correct token. Wake bot.')
      controller.spawn({
        token: config.slack.bot_token
      }).startRTM()
      bot(controller)
    } else {
      console.log('Incorrect token. Your provided token is: ' + token)
      res.send({
        "response_type": "ephemeral",
        "text": "Sorry. That didn't work :("
      })
      process.exit()
    }
  } else if (action == 'sleep') {
    if (token == config.slack.sleep_token) {
      console.log('Correct token. Sleep bot.')
      process.exit();
    } else {
      console.log('Incorrect token. Your provided token is: ' + token)
    }
  } else {
    console.log('Well, that did not work.')
  }
}
