import mongoose from 'mongoose';

// Connect to mongodb
module.exports = function() {
  // run mongoose
  mongoose.connect('mongodb://localhost:27017/cst499');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('DB CONNECTED');
  });
};
