const { Service } = require('feathers-mongoose');

exports.Rooms = class Rooms extends Service {
  async find(params) {
    const { query } = params;
    if (query && query.is_get_recent_messages) {
      return super.Model.find(
        {
          newestMessage: { $exists: true },
          ...query,
        },
        'participants newestMessage'
      )
        .populate({
          path: 'newestMessage',
        })
        .sort({ updatedAt: -1 });
    }
    return super.find(params);
  }
};
