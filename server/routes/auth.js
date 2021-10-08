const path = require('path');
const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../client/login.html'));
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

module.exports = router;
