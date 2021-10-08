const router = require('express').Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.getMessages, (req, res) => {
  res.status(200).json(res.locals.messages);
});

router.post('/', messageController.createMessage, (req, res) => {
  res.status(200).json(res.locals.message);
});

router.put('/:id', messageController.updateMessage, (req, res) => {
  res.status(200).json(res.locals.message);
});

router.delete('/:id', messageController.deleteMessage, (req, res) => {
  res.status(200).json(res.locals.message);
});

module.exports = router;
