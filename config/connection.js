const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-media', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;