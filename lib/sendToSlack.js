var request = require('request')
var config = require('../config.js')

module.exports = function (message) {

  var body = {
    text: message,
    channel: '#coffeebot-test'
  };

  request({
    method: 'POST',
    url: config.slack.webhook,
    headers: {
      'Content-Type': 'application/json'
    }
  }).end(JSON.stringify(body))
}
