const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const rooms = require('./rooms/rooms.service.js');
const getRecentMessages = require('./aggregations/get-recent-messages');
const uploads = require('./uploads/uploads.service');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(rooms);
  app.configure(getRecentMessages);
  app.configure(uploads);
};
