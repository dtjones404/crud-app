const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');

// with response, send user a cookie containing their user id
passport.serializeUser((user, done) => {
  try {
    return done(null, user.id);
  } catch (err) {
    console.log(err);
    return done(err);
  }
});

// upon recieving user id cookie, find user object in db and attach to req
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log(err);
    return done(err);
  }
});

// define passport's first-party password strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user || !(await user.verifyPassword(password))) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  })
);

// define passport's google oauth strategy
passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/api/auth/google/callback',
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // destructure google profile for user details
          const {
            id: googleId,
            displayName: username,
            name: { familyName: lastname, givenName: firstname },
          } = profile;
          // create new user in db using details
          username = username || `${firstname} ${lastname}`;
          user = await User.create({ googleId, username });
        }
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);
