const User = require('../models/User');

const UserController = {};

UserController.createUser = async (req, res, next) => {
  try {
    res.locals.mesasge = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    next();
  } catch (err) {
    return next({
      log: `userController.createUser ERROR: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = UserController;
