require('dotenv').config();
require('./db.js');
require('./config/passport');

const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');

const express = require('express');
const app = express();

// import routers
const messageRouter = require('./routes/message');
const authRouter = require('./routes/auth');

//utility middleware
app.use(express.json());
app.use('/client', express.static(path.resolve(__dirname, '../client')));

// enable sessions using passport.js middleware
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
    httpOnly: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// use routers
app.use('/api/message', messageRouter);
app.use('/api/auth', authRouter);

// serve index
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// 404 handler
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  console.log(`server listening on port ${PORT}`);
});
