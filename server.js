var express = require('express')
var bodyParser = require('body-parser')
var emoji = require('node-emoji')

var brew = require('./lib/brew.js')
var botWakeSleep = require('./lib/botWakeSleep.js')
var dailyCheck = require('./lib/check.js')

var app = express()

var port = process.env.port || 8080

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send(emoji.get('coffee'))
})

app.get('/brew/', function(req, res) {
  res.send(emoji.get('coffee'))
  var code = req.query.code
  brew(code)
})

app.post('/wakeup/', function(req, res) {
  res.send(emoji.get('coffee'))
  var token = req.body.token
  botWakeSleep('wake', token)
  dailyCheck('start')
});

app.post('/sleep/', function(req, res) {
  res.send(emoji.get('coffee'))
  var token = req.body.token
  dailyCheck('stop')
  botWakeSleep('sleep', token)
});

app.listen(port, function() {
  console.log('App listening... on ' + port)
})
