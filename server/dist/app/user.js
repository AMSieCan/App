'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = exports.loginUser = exports.me = exports.generateAccessToken = exports.verifyAccessToken = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _index = require('../model/index');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PRIVATE_KEY = 'mySecret';

var USER_ROLE = {
  ADMIN: 'ADMIN'
};

var verifyAccessToken = exports.verifyAccessToken = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(accessToken) {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _jsonwebtoken2.default.verify(accessToken, PRIVATE_KEY);

          case 3:
            data = _context.sent;
            return _context.abrupt('return', data);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            throw _context.t0;

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function verifyAccessToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

var generateAccessToken = exports.generateAccessToken = function generateAccessToken(userId) {
  var token = _jsonwebtoken2.default.sign({
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    userId: userId
  }, PRIVATE_KEY);
  return token;
};

var me = exports.me = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(accessToken) {
    var tokenData, user;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return verifyAccessToken(accessToken);

          case 3:
            tokenData = _context2.sent;

            if (!(tokenData && tokenData.userId)) {
              _context2.next = 11;
              break;
            }

            _context2.next = 7;
            return _index.userModel.findById(tokenData.userId);

          case 7:
            user = _context2.sent;

            if (!user) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt('return', {
              _id: user._id,
              emailAddress: user.emailAddress,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              role: user.role
            });

          case 10:
            throw new Error('User not found');

          case 11:
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](0);
            throw _context2.t0;

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 13]]);
  }));

  return function me(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var loginUser = exports.loginUser = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(emailAddress, password) {
    var user, passwordMatched, generatedAccessToken;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _index.userModel.findOne({ emailAddress: emailAddress });

          case 3:
            user = _context3.sent;

            if (!user) {
              _context3.next = 10;
              break;
            }

            passwordMatched = _bcrypt2.default.compareSync(password, user.password);

            if (passwordMatched) {
              _context3.next = 8;
              break;
            }

            throw new Error('Password not matched');

          case 8:
            generatedAccessToken = generateAccessToken(user._id);
            return _context3.abrupt('return', generatedAccessToken);

          case 10:
            throw new Error('Email address not found');

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3['catch'](0);
            throw _context3.t0;

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 13]]);
  }));

  return function loginUser(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var createUser = exports.createUser = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(emailAddress, password) {
    var user, newUser, generatedAccessToken;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _index.userModel.findOne({ emailAddress: emailAddress });

          case 3:
            user = _context4.sent;

            if (!user) {
              _context4.next = 6;
              break;
            }

            throw new Error('Email already exists');

          case 6:
            _context4.next = 8;
            return _index.userModel.create({
              emailAddress: emailAddress,
              password: _bcrypt2.default.hashSync(password, 10),
              role: USER_ROLE.ADMIN
            });

          case 8:
            newUser = _context4.sent;

            if (!newUser) {
              _context4.next = 12;
              break;
            }

            generatedAccessToken = generateAccessToken(newUser._id);
            return _context4.abrupt('return', generatedAccessToken);

          case 12:
            throw new Error('Failed to create user');

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4['catch'](0);
            throw _context4.t0;

          case 18:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 15]]);
  }));

  return function createUser(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();