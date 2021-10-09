const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  googleId: String,
  password: String,
});

userSchema.methods.verifyPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.log(err);
  }
};

userSchema.pre('save', async function () {
  try {
    this.password = await bcrypt.hash(this.password, 12);
  } catch (err) {
    console.log(err);
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
