const path = require('path');
const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.status(200).json({ msg: 'login successful' });
  }
);

router.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json({ msg: 'signup successful' });
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/auth/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
