const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  data: Buffer,
  contentType: String
});

module.exports = mongoose.model('File', fileSchema);
