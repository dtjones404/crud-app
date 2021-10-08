const mongoose = require('mongoose');

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'codesmithChat',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));
