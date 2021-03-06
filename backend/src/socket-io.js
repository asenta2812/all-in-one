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
    socket.on(
      'sendSeenMessage',
      async (roomId, participantIds, seenAt, callback) => {
        const { messages: messageSchema } = app.get('mongooseClient').models;
        try {
          io.to(participantIds.map((i) => socketIdWithUserId[i])).emit(
            'listenSeenMessage',
            {
              at_room: roomId,
              seenAt,
              seen_by: socket.decoded.sub.toString(),
            }
          );
          await messageSchema.updateMany(
            {
              at_room: roomId,
              createdAt: { $lt: seenAt },
              sender: { $ne: socket.decoded.sub },
              seen_by: { $nin: [socket.decoded.sub] },
            },
            { $push: { seen_by: socket.decoded.sub } }
          );
        } catch (error) {
          console.log({ error });
          return callback({ error });
        }
      }
    );

    // for call
    socket.on('callUser', (data) => {
      data.toIds.forEach((user) => {
        io.to(socketIdWithUserId[user]).emit('callUser', {
          signal: data.signalData,
          ...data,
        });
      });
    });

    socket.on('answerCall', (data) => {
      io.to(socketIdWithUserId[data.toInitiator]).emit(
        'callAccepted',
        data.signal
      );
    });
    socket.on('disconnect', () => {
      socketIdWithUserId[socket.decoded.sub.toString()] = null;
    });
  });
};
