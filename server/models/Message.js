const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    username: { type: String, required: true },
  },
  { useTimestamps: true }
);

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
