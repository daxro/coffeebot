var Botkit = require('botkit');
var config = require('./config.js');
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var controller = Botkit.slackbot({
  debug: false
});

function sendToSlack(message) {
  console.log(message)

  // Set the headers
  var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
  }

  // Configure the request
  var options = {
    url: 'https://hooks.slack.com/services/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',
    method: 'POST',
    headers: headers,
    payload: {
      'channel': '#coffeebot-test',
      'text': 'hello'
    }
  }

  // Start the request
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      console.log(body)
    }
  })
}

app.get('/brew/', function(req, res) {
  sendToSlack('Brewing')
  setTimeout(function() {
    sendToSlack('Brewing done')
  }, 3600) //change to 6 min (360000)
})

app.post('/wakeup/', function(req, res) {
  var token = req.body.token
  if (token == config.slack.wake_token) {
    console.log('Correct token. Wake bot.')
    res.send(200)
    controller.spawn({
      token: config.slack.token
    }).startRTM()
  } else {
    console.log('Incorrect token. Your provided token is: ' + token)
    res.send({
      "response_type": "ephemeral",
      "text": "Sorry. That didn't work :("
    })
    process.exit()
  }
});

app.post('/sleep/', function(req, res) {
  var token = req.body.token
  if (token == config.slack.sleep_token) {
    console.log('Correct token. Sleep bot.')
    process.exit();
  } else {
    console.log('Incorrect token. Your provided token is: ' + token)
    res.send({
      "response_type": "ephemeral",
      "text": "Sorry. That didn't work :("
    })
  }
});

controller.hears('hello', ['direct_message','direct_mention','mention'], function(bot, message) {
  bot.reply(message,'Hello yourself');

})

app.listen(3000, function() {
  console.log('App listening...')
})
