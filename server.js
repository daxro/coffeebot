var Botkit = require('botkit')
var express = require('express')
var bodyParser = require('body-parser')
var emoji = require('node-emoji')

var brew = require('./lib/brew.js')
var botWakeSleep = require('./lib/botWakeSleep.js')

var app = express()

var port = process.env.port || 8080

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var controller = Botkit.slackbot({
  debug: false
});

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
});

app.post('/sleep/', function(req, res) {
  res.send(emoji.get('coffee'))
  var token = req.body.token
  botWakeSleep('sleep', token)
});

controller.hears('hello', ['direct_message','direct_mention','mention'], function(bot, message) {
  bot.reply(message,'Hello yourself');
})

app.listen(port, function() {
  console.log('App listening... on ' + port)
})
