var sendToSlack = require('../lib/sendToSlack.js')
var config = require('../config.js')

module.exports = function (code) {
  if (code == config.slack.get_code) {
    console.log('Correct code.')
    sendToSlack('I just started brewing. I will be back in six minutes!')
    setTimeout(function() {
      sendToSlack('I am done! Come and get some of that coffee.')
    }, 360000)
  } else {
    console.log('Incorrect code.')
  }
}
