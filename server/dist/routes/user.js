'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user = require('../app/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  me: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var accessToken, userData;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(req.headers.authorization && req.headers.authorization.includes('Bearer '))) {
                _context.next = 8;
                break;
              }

              accessToken = req.headers.authorization.replace('Bearer ', '');
              _context.next = 5;
              return (0, _user.me)(accessToken);

            case 5:
              userData = _context.sent;

              if (!userData) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', res.send(userData));

            case 8:
              throw new Error('User not found.');

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](0);

              res.status(500).send({ message: _context.t0.message });

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 11]]);
    }));

    return function me(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),
  signUp: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var _req$body, emailAddress, password, token;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              // Validate email and password
              _req$body = req.body, emailAddress = _req$body.emailAddress, password = _req$body.password;

              if (emailAddress) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ message: 'Email address is not valid' }));

            case 4:
              if (password) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ message: 'Password is not valid' }));

            case 6:
              _context2.next = 8;
              return (0, _user.createUser)(emailAddress.toLowerCase(), password);

            case 8:
              token = _context2.sent;


              res.send(token);
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](0);

              res.status(500).send({ message: _context2.t0.message });

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 12]]);
    }));

    return function signUp(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),
  login: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      var _req$body2, emailAddress, password, token;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              // Validate email and password
              _req$body2 = req.body, emailAddress = _req$body2.emailAddress, password = _req$body2.password;

              if (emailAddress) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt('return', res.status(400).send({ message: 'Email address is not valid' }));

            case 4:
              if (password) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt('return', res.status(400).send({ message: 'Password is not valid' }));

            case 6:
              _context3.next = 8;
              return (0, _user.loginUser)(emailAddress.toLowerCase(), password);

            case 8:
              token = _context3.sent;


              res.send(token);
              _context3.next = 15;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3['catch'](0);

              res.status(500).send({ message: _context3.t0.message });

            case 15:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 12]]);
    }));

    return function login(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),
  delete: function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              try {} catch (err) {
                res.status(500).send({ message: err.message });
              }

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function _delete(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),
  patch: function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              try {} catch (err) {
                res.status(500).send({ message: err.message });
              }

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function patch(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()
};