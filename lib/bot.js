
module.exports = function (controller) {
  controller.hears('hello', ['direct_message','direct_mention','mention'], function(bot, message) {
    bot.reply(message,'Hello yourself');
  })
}
