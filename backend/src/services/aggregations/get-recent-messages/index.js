module.exports = (app) => {
  const path = '/chat/get-recent-messages/:user_id';
  app.use(path, async (req, res, next) => {
    const { user_id } = req.params;
    const { rooms: roomSchema, messages: messageSchema } =
      app.get('mongooseClient').models;
    try {
      const rooms = await roomSchema
        .find({
          'participants.user': user_id,
        })
        .populate('participants.user');

      if (rooms.length === 0) return res.json({ messages: [] });

      const listMessageNewest = await messageSchema.aggregate([
        {
          $match: {
            at_room: {
              $in: rooms.map((f) => f._id),
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $group: {
            _id: '$at_room',
            message: {
              $first: '$$ROOT',
            },
          },
        },
      ]);
      const messages = listMessageNewest.map((item) => {
        const room = rooms.find(
          (f) => f._id.toString() === item._id.toString()
        );
        return {
          ...item,
          room,
        };
      });
      return res.send({ messages });
    } catch (err) {
      return next(err);
    }
  });
};
