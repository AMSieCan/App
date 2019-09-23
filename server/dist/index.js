'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _db = require('./db/db');

var _db2 = _interopRequireDefault(_db);

var _user = require('./app/user');

var _device = require('./app/device');

var _model = require('./model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
(0, _db2.default)();

app.use(_bodyParser2.default.json({ limit: '50mb' }));
app.use((0, _cors2.default)());
var server = _http2.default.createServer(app);

server.listen({ port: 8000 }, function () {
  console.log('Server ready at 8000');
});

app.get('/', function (req, res) {
  res.send('hello world');
});

app.post('/webhook', function (req, res) {
  console.log(req.body);
  res.send('OK');
});

app.post('/login', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var _req$body, emailAddress, password, token;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            // Validate email and password
            _req$body = req.body, emailAddress = _req$body.emailAddress, password = _req$body.password;

            if (emailAddress) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', res.status(400).send({ message: 'Email address is not valid' }));

          case 4:
            if (password) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', res.status(400).send({ message: 'Password is not valid' }));

          case 6:
            _context.next = 8;
            return (0, _user.loginUser)(emailAddress.toLowerCase(), password);

          case 8:
            token = _context.sent;


            res.send(token);
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);

            res.status(500).send({ message: _context.t0.message });

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

app.post('/signup', function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body2, emailAddress, password, token;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            // Validate email and password
            _req$body2 = req.body, emailAddress = _req$body2.emailAddress, password = _req$body2.password;

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

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

app.post('/devices', function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var _req$body3, _serialNumber, _locationDescription, serialFormat, token;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            // Validate serial number and location
            _req$body3 = req.body, _serialNumber = _req$body3.serialNumber, _locationDescription = _req$body3.locationDescription;
            serialFormat = /^([0-9a-z]){24}$/i; // alphanumeric, length 24, case insensitive

            if (!(!_serialNumber || !_serialNumber.match(serialFormat))) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', res.status(400).send({ message: 'Serial number is not valid!' }));

          case 5:
            if (_locationDescription) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt('return', res.status(400).send({ message: 'You must enter a location description.' }));

          case 7:
            _context3.next = 9;
            return (0, _device.addDevice)(_serialNumber.toLowerCase(), _locationDescription);

          case 9:
            token = _context3.sent;


            res.send(token);
            _context3.next = 16;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3['catch'](0);

            res.status(500).send({ message: _context3.t0.message });

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 13]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

app.get('/me', function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var accessToken, userData;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;

            if (!(req.headers.authorization && req.headers.authorization.includes('Bearer '))) {
              _context4.next = 8;
              break;
            }

            accessToken = req.headers.authorization.replace('Bearer ', '');
            _context4.next = 5;
            return (0, _user.me)(accessToken);

          case 5:
            userData = _context4.sent;

            if (!userData) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt('return', res.send(userData));

          case 8:
            throw new Error('User not found.');

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](0);

            res.status(500).send({ message: _context4.t0.message });

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 11]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());