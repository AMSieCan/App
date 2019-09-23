'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.device = exports.userModel = undefined;

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
require('mongoose-type-email');
var userModel = exports.userModel = mongoose.model('users', new mongoose.Schema({
  _id: {
    type: String,
    default: function _default() {
      return (0, _v2.default)();
    }
  },
  emailAddress: mongoose.SchemaTypes.Email,
  password: String,
  role: String
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}));

var device = exports.device = mongoose.model('device', new mongoose.Schema({
  _id: {
    type: String,
    default: function _default() {
      return (0, _v2.default)();
    }
  },
  name: String,
  serialNumber: String,
  locationDescription: String,
  lat: Number,
  long: Number,
  status: Number,
  lastDescription: String
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}));