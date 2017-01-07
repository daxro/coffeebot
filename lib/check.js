var CronJob = require('cron').CronJob;
var sendToSlack = require('../lib/sendToSlack.js')
var getLatestBrew = require('../lib/getLatestBrew.js')

var latestBrewTimestamp = getLatestBrew.latestBrewTimestamp

var now = new Date()

var job = new CronJob({
  cronTime: '00 00 09 * * 1-5',
  onTick: function() {
    var brewedToday = (now.toDateString() === latestBrewTimestamp.toDateString());
    if (brewedToday) {
      console.log('No action')
    } else {
      console.log('No coffee-msg sent to Slack')
      sendToSlack('No coffee yet today... Why? :coffee:')
    }
  },
  start: false,
  timeZone: 'Europe/Stockholm'
});

module.exports = function (action) {
  if (action == 'start') {
    job.start()
    console.log("cron started")
    console.log(latestBrewTimestamp)
  } else {
    job.stop()
    console.log("cron stopped")
  }
}
