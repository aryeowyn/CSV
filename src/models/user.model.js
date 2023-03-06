const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['normal', 'admin'],
    default: 'normal'
  }
});

module.exports = mongoose.model('User', userSchema);
