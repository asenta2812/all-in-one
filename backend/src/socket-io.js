const { NotAuthenticated } = require('@feathersjs/errors');
const { Server } = require('socket.io');

module.exports = function (app) {
  let socketIdWithUserId = [];
  const io = new Server(app.get('socketPort'), {
    cors: {
      origin: '*',
    },
    path: '/chat',
  });
  io.use(async function (socket, next) {
    // Authentication socket with jwt
    if (socket.handshake.auth && socket.handshake.auth.token) {
      try {
        const authService = app.service('authentication');
        const decoded = await authService.verifyAccessToken(
          socket.handshake.auth.token
        );
        socket.decoded = decoded;
        next();
      } catch (err) {
        const error = new Error(err.message);
        next(error);
      }
    } else {
      const error = new NotAuthenticated();
      next(error);
    }
  });
  io.on('connection', (socket) => {
    socketIdWithUserId[socket.decoded.sub.toString()] = socket.id;
    socket.on('messageToServer', async (message, participantIds, callback) => {
      const messageService = app.service('messages');
      try {
        const messageCreate = await messageService.create(message);
        io.to(participantIds.map((i) => socketIdWithUserId[i])).emit(
          'messageToClient',
          {
            message: messageCreate,
          }
        );
        await app
          .service('rooms')
          .patch(message.at_room, { newestMessage: messageCreate._id });
      } catch (error) {
        return callback({ error });
      }
    });

    socket.on('disconnect', () => {
      socketIdWithUserId[socket.decoded.sub.toString()] = null;
    });
  });
};
