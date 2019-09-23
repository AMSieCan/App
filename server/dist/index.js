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

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _institution = require('./routes/institution');

var _institution2 = _interopRequireDefault(_institution);

var _device = require('./routes/device');

var _device2 = _interopRequireDefault(_device);

var _device3 = require('./app/device');

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

app.post('/devices', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var _req$body, _serialNumber, _locationDescription, serialFormat, token;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            // Validate serial number and location
            _req$body = req.body, _serialNumber = _req$body.serialNumber, _locationDescription = _req$body.locationDescription;
            serialFormat = /^([0-9a-z]){24}$/i; // alphanumeric, length 24, case insensitive

            if (!(!_serialNumber || !_serialNumber.match(serialFormat))) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', res.status(400).send({ message: 'Serial number is not valid!' }));

          case 5:
            if (_locationDescription) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', res.status(400).send({ message: 'You must enter a location description.' }));

          case 7:
            _context.next = 9;
            return (0, _device3.addDevice)(_serialNumber.toLowerCase(), _locationDescription);

          case 9:
            token = _context.sent;


            res.send(token);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](0);

            res.status(500).send({ message: _context.t0.message });

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 13]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// Users
app.get('/users/me', _user2.default.me);
app.post('/users', _user2.default.signUp);
app.post('/users/login', _user2.default.login);
app.delete('/users/:id', _user2.default.delete);
app.put('/users/:id', _user2.default.patch);

// Institution
app.get('/institutions/:id', _institution2.default.get);
app.post('/institutions', _institution2.default.create);
app.delete('/institutions/:id', _institution2.default.delete);
app.put('/institutions/:id', _institution2.default.patch);
app.get('/institutions', _institution2.default.list);

// Device
app.get('/devices/:id', _device2.default.get);
app.post('/devices', _device2.default.create);
app.delete('/devices/:id', _device2.default.delete);
app.put('/devices/:id', _device2.default.patch);
app.get('/devices', _device2.default.list);