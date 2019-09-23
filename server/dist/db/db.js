'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connect to mongodb
module.exports = function () {
  // run mongoose
  _mongoose2.default.connect('mongodb://localhost:27017/cst499', { useNewUrlParser: true });
  var db = _mongoose2.default.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('DB CONNECTED');
  });
};