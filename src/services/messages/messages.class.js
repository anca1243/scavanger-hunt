/* eslint-disable no-unused-vars */
// Twilio Credentials
const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);
var request = require('request');
var challenges = require('./../../challenges.json');

var url = 'http://pi:cluster@proxy.rp01.eu.ngrok.io/'
var db = 'scavanger_test/'

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    console.log(data["From"]);
    console.log(data["Body"])
    request.put({
      url: url + db + data["From"].slice(3, data["From"].length),
      body: {name:data["Body"], score:0, challengesSolved:[]},
      json: true,
      }, function(err, resp, body) {
      // Read the document
      console.log(body);

      if(body.error){
        //check if the response is the answer to a challenge
        var challengeNumber = data["Body"].split(" ,.")[0];
        console.log(parseInt(challengeNumber));
        if(isNaN(parseInt(challengeNumber))) {
          client.messages
          .create({
            to: data["From"],
            from: '+441403540181',
            body: "Please add the challenge number at the beginning of the text. ",
          })
          .then(message => console.log(message.sid));
          return true
        }
        var challenge = challenges.filter(function(obj){
          return obj.id == parseInt(challengeNumber);
        })
        challenge = challenge[0];
        console.log(challenge);
        console.log(data["Body"].toLowerCase().indexOf(challenge.answer.toLowerCase()))
        if(data["Body"].toLowerCase().indexOf(challenge.answer.toLowerCase()) !== -1){

          //update score in the database
          request.get({
            url: url + db + data["From"].slice(3, data["From"].length),
            json:true
          }, function(err, resp, body) {
            console.log(body);
            if(body.challengesSolved.includes(challenge.id)){
              client.messages
              .create({
                to: data["From"],
                from: '+441403540181',
                body: "The mighty Thor will strike you down. Don't cheat!"
              })
              .then(message => console.log(message.sid));
              return true;
            } else if(challenge.response !== undefined){
               //send response if it exists
              client.messages
              .create({
                to: data["From"],
                from: '+441403540181',
                body: challenge.response,
              })
              .then(message => console.log(message.sid));
            }else {
              //otherwise send next challenge
              var nextChallenge = challenges.filter(function(obj){
                return obj.id == parseInt(challengeNumber)+1;
              })
              client.messages
              .create({
                to: data["From"],
                from: '+441403540181',
                body: 'Well done! Here is the next challenge.\n'+nextChallenge[0].challenge,
              })
              .then(message => console.log(message.sid));
            }
            body.challengesSolved.push(challenge.id);
            console.log(body.challengesSolved);
              request.put({
                url: url + db + data["From"].slice(3, data["From"].length),
                body: { name: body.name, score:body.score+challenge.points, challengesSolved:body.challengesSolved, "_rev": body["_rev"]},
                json: true,
                }, function(err, resp, body) {
                  console.log(body);
                })
          })
        } else if (data["Body"].toLowerCase().indexOf("hint") !== -1){
          client.messages
          .create({
            to: data["From"],
            from: '+441403540181',
            body: challenge.hint,
          })
          .then(message => console.log(message.sid));
        }else{
          client.messages
          .create({
            to: data["From"],
            from: '+441403540181',
            body: "Unfortunately, that answer was not correct. Try again!",
          })
          .then(message => console.log(message.sid));
        }

      } else {
        //if it is the first time a user is registering, send him the first challenge
        var firstChallenge = challenges.filter(function( obj ) {
          return obj.id == 1;
        });
        client.messages
        .create({
          to: data["From"],
          from: '+441403540181',
          body: firstChallenge[0].challenge,
        })
        .then(message => console.log(message.sid));
      }
    })
    return true;
  }


  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
