var JsonDB = require('node-json-db')
var db = new JsonDB("db", true, true)

var data = db.getData("/") // fetch all entries from the db
var latestBrew = data.startedBrewing[data.startedBrewing.length-1]
var dateStr = JSON.stringify(latestBrew)
var dateParsed = JSON.parse(dateStr);
var latestBrewTimestamp = new Date(dateParsed);

exports.latestBrewTimestamp = latestBrewTimestamp
