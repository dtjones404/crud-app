const Message = require('../models/Message');

const messageController = {};

messageController.createMessage = async (req, res, next) => {
  try {
    res.locals.mesasge = await Message.create({
      text: req.body.text,
      username: req.user.username,
    });
    next();
  } catch (err) {
    return next({
      log: `messageController.createMessage ERROR: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

messageController.getMessages = async (req, res, next) => {
  try {
    res.locals.messages = await Message.find({});
    next();
  } catch (err) {
    return next({
      log: `messageController.getMessages ERROR: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

messageController.updateMessage = async (req, res, next) => {
  try {
    res.locals.message = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    next();
  } catch (err) {
    return next({
      log: `messageController.updateMessage ERROR: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

messageController.deleteMessage = async (req, res, next) => {
  try {
    res.locals.message = await Message.findByIdAndDelete(req.params.id, {
      new: true,
    });
    next();
  } catch (err) {
    return next({
      log: `messageController.deleteMessage ERROR: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = messageController;
