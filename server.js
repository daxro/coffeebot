var Botkit = require('botkit');
var config = require('./config.js');
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

var app = express()

var port = process.env.port || 8080

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var controller = Botkit.slackbot({
  debug: false
});

function sendToSlack(message) {

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

app.get('/', function(req, res) {
  res.send('Hello.')
})

app.get('/brew/', function(req, res) {
  res.send('Hello.')

  // only execute on requets that includes the code
  if (req.query.code == config.slack.get_code) {
    console.log('Correct code.')
    sendToSlack('I just started brewing. I will be back in six minutes!')
    setTimeout(function() {
      sendToSlack('I am done! Come and get some of that coffee.')
    }, 360000)
  } else {
    console.log('Incorrect code.')
  }
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

app.listen(port, function() {
  console.log('App listening... on ' + port)
})
