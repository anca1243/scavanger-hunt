const astronauts = require('./astronauts/astronauts.service.js');
const messages = require('./messages/messages.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(astronauts);
  app.configure(messages);
};
