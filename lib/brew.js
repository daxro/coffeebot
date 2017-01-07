var sendToSlack = require('../lib/sendToSlack.js')
var config = require('../config.js')
var JsonDB = require('node-json-db')
var getLatestBrew = require('../lib/getLatestBrew.js')

var db = new JsonDB("db", true, true)

var now = new Date()
var latestBrewTimestamp = getLatestBrew.latestBrewTimestamp

var limit = 600000 // 10 min limit for posting to Slack

var isLimitReached = (now - latestBrewTimestamp) < limit

//issue : isLimitReached does not work

module.exports = function (code) {
  if (isLimitReached) {
    console.log('Limit reached. Wait')
  } else if (code == config.slack.get_code) {
    console.log('Correct code.')
    sendToSlack('I just started brewing. I will be back in six minutes!')
    db.push("/startedBrewing[]", now);
    setTimeout(function() {
      sendToSlack('I am done! Come and get some of that coffee.')
    }, 360000)
  } else {
    console.log('Incorrect code.')
  }
}
