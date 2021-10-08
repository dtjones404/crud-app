const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  googleId: String,
  password: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
