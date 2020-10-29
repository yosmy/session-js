"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Props = exports.ListSessions = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ui = require("@yosmy/ui");

var _phone = require("@yosmy/phone");

var _device = require("@yosmy/device");

var _Session = require("./Session");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ListSessions = function ListSessions(_ref) {
  var ui = _ref.ui,
      api = _ref.api,
      criteria = _ref.criteria,
      hide = _ref.hide,
      onSelectUser = _ref.onSelectUser,
      onSelectDevice = _ref.onSelectDevice;
  return /*#__PURE__*/_react["default"].createElement(_ui.LoaderList, {
    ui: {
      layout: ui.layout,
      empty: function empty() {
        return /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "No hay sessiones");
      },
      loading: function loading() {
        return /*#__PURE__*/_react["default"].createElement(_ui.Container, {
          margin: {
            top: 2
          }
        }, /*#__PURE__*/_react["default"].createElement(_ui.LinePlaceholder, null), /*#__PURE__*/_react["default"].createElement(_ui.LinePlaceholder, null), /*#__PURE__*/_react["default"].createElement(_ui.LinePlaceholder, null));
      },
      more: function more(_ref2) {
        var onClick = _ref2.onClick;
        return /*#__PURE__*/_react["default"].createElement(_ui.Container, {
          flow: "row",
          align: {
            main: "center"
          }
        }, /*#__PURE__*/_react["default"].createElement(_ui.PrimaryButton, {
          margin: {
            top: 2
          },
          onClick: onClick
        }, /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "Mostrar m\xE1s")));
      },
      item: function item(_ref3) {
        var id = _ref3.id,
            user = _ref3.user,
            device = _ref3.device;

        if (typeof user === "string") {
          return /*#__PURE__*/_react["default"].createElement(_Session.SessionPlaceholder, {
            key: id,
            user: user,
            device: device
          });
        }

        user = !hide.user ? user : undefined;
        device = !hide.device ? device : undefined;
        return /*#__PURE__*/_react["default"].createElement(_Session.Session, {
          key: id,
          user: user,
          device: device,
          onSelectUser: onSelectUser,
          onSelectDevice: onSelectDevice
        });
      }
    },
    criteria: {
      query: {
        user: criteria.user,
        devices: criteria.devices
      },
      limit: criteria.limit
    },
    onCollect: function onCollect(query, skip, limit) {
      return new Promise(function (resolve) {
        api.collectSessions(query.user, query.devices, skip, limit, // onReturn
        function (sessions) {
          resolve({
            items: sessions,
            onEnrich: function () {
              var _onEnrich = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sessions) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _phone.enrich.enrichUsers(sessions, // filter
                        function () {
                          return true;
                        }, // pick
                        function (session) {
                          return session.user;
                        }, // collect
                        function (users) {
                          return new Promise(function (resolve) {
                            api.collectPhones(users, null, resolve);
                          });
                        }, // enrich
                        function (session, user) {
                          return _objectSpread(_objectSpread({}, session), {}, {
                            user: user
                          });
                        });

                      case 2:
                        sessions = _context.sent;
                        _context.next = 5;
                        return _device.enrich.enrichDevices(sessions, // filter
                        function () {
                          return true;
                        }, // pick
                        function (session) {
                          return session.device;
                        }, // collect
                        function (devices) {
                          return new Promise(function (resolve) {
                            api.collectDevices(devices, resolve);
                          });
                        }, // enrich
                        function (session, device) {
                          return _objectSpread(_objectSpread({}, session), {}, {
                            device: device
                          });
                        });

                      case 5:
                        sessions = _context.sent;
                        return _context.abrupt("return", sessions);

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              function onEnrich(_x) {
                return _onEnrich.apply(this, arguments);
              }

              return onEnrich;
            }()
          });
        });
      });
    }
  });
};

exports.ListSessions = ListSessions;
var Props = {
  ui: _propTypes["default"].shape({
    layout: _propTypes["default"].func.isRequired
  }).isRequired,
  api: _propTypes["default"].shape({
    collectSessions: _propTypes["default"].func.isRequired,
    collectPhones: _propTypes["default"].func.isRequired,
    collectDevices: _propTypes["default"].func.isRequired
  }).isRequired,
  criteria: _propTypes["default"].shape({
    user: _propTypes["default"].string,
    devices: _propTypes["default"].arrayOf(_propTypes["default"].string),
    limit: _propTypes["default"].number
  }).isRequired,
  hide: _propTypes["default"].shape({
    user: _propTypes["default"].bool,
    device: _propTypes["default"].bool
  }).isRequired,
  onSelectUser: _propTypes["default"].func,
  onSelectDevice: _propTypes["default"].func
};
exports.Props = Props;
ListSessions.propTypes = Props;
ListSessions.defaultProps = {
  hide: {
    user: false,
    device: false
  }
};