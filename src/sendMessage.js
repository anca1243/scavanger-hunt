// Download the Node helper library from twilio.com/docs/libraries/node
// These consts are your accountSid and authToken from https://www.twilio.com/console
const accountSid = 'ACa51ed6fc7942c9b655a56ffb081d23bf';
const authToken = '6ad541389549c68600f8b43eee7de032';
const challenges = require("./challenges.json")
const client = require('twilio')(accountSid, authToken);
const request = require("request");

var url = 'http://pi:cluster@proxy.rp01.eu.ngrok.io/'
var db = 'scavanger_test/'

phones=["+447519239035"];

var challenge = challenges.filter(function(obj){
  return obj.id == 5;
})
challenge = challenge[0];
///"+db+"/_all_docs"
request.get({
  url: url + db +"/_all_docs",
  json:true
}, function(err, resp, body) {
  console.log(body);
  phones = body.rows.map(a => "+44"+a.id);
  console.log(phones);
  for ( var index in phones ){
    client.messages
    .create({
      to: phones[index],
      from: '+441403540181',
      body: "Good Morning, Astronauts\nThe scavanger hunt did not end yet! We have prepared flash riddle round for you to start the day with!\nGood luck!\n\n"+challenge.challenge,
    })
    .then(message => console.log(message.sid));
  }
})
console.log("running")
