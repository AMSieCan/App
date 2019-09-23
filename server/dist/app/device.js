'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDevice = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _index = require('../model/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addDevice = exports.addDevice = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(serialNumber, locationDescription) {
    var serial, newDevice;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _index.device.findOne({ serialNumber: serialNumber });

          case 3:
            serial = _context.sent;

            if (!serial) {
              _context.next = 6;
              break;
            }

            throw new Error('Device is already registered.');

          case 6:
            _context.next = 8;
            return _index.device.create({
              serialNumber: serialNumber,
              locationDescription: locationDescription
            });

          case 8:
            newDevice = _context.sent;

            if (!newDevice) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', newDevice);

          case 11:
            throw new Error('Failed to add device');

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](0);
            throw _context.t0;

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 14]]);
  }));

  return function addDevice(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();