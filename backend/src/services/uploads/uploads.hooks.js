const dauria = require('dauria');

module.exports = {
  before: {
    all: [],
    get: [],
    create: [
      (context) => {
        if (!context.data.uri && context.params.file) {
          const file = context.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          context.data = { uri };
        }
      },
    ],
    remove: [],
  },

  after: {
    all: [],
    get: [
      (context) => {
        if (context.result.uri) {
          context.result.filename = context.params.query.filename;
          context.result.file = dauria.parseDataURI(context.result.uri);
          delete context.result.uri;
        }
      },
    ],
    create: [
      (context) => {
        if (context.result.uri) {
          delete context.result.uri;
        }
      },
    ],
    remove: [],
  },

  error: {
    all: [],
    get: [],
    create: [],
    remove: [],
  },
};
