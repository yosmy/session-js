"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionPlaceholderProps = exports.SessionPlaceholder = exports.SessionProps = exports.Session = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ui = require("@yosmy/ui");

var _phone = require("@yosmy/phone");

var _device = require("@yosmy/device");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SessionLayout = function SessionLayout(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return /*#__PURE__*/_react["default"].createElement(_ui.Container, _extends({
    flow: "row",
    margin: {
      top: 2
    }
  }, props), children);
};

var Session = function Session(_ref2) {
  var user = _ref2.user,
      device = _ref2.device,
      onSelectUser = _ref2.onSelectUser,
      onSelectDevice = _ref2.onSelectDevice,
      props = _objectWithoutProperties(_ref2, ["user", "device", "onSelectUser", "onSelectDevice"]);

  return /*#__PURE__*/_react["default"].createElement(SessionLayout, props, user && /*#__PURE__*/_react["default"].createElement(_phone.Phone, {
    country: user.country,
    prefix: user.prefix,
    number: user.number,
    onClick: function onClick() {
      onSelectUser(user.id);
    }
  }), device && /*#__PURE__*/_react["default"].createElement(_device.Device, {
    margin: {
      left: user ? 1 : undefined
    },
    data: device.data,
    onClick: function onClick() {
      onSelectDevice(device.id);
    }
  }));
};

exports.Session = Session;
var SessionProps = {
  user: _propTypes["default"].object,
  device: _propTypes["default"].object,
  onSelectUser: _propTypes["default"].func,
  onSelectDevice: _propTypes["default"].func
};
exports.SessionProps = SessionProps;
Session.propTypes = SessionProps;

var SessionPlaceholder = function SessionPlaceholder(_ref3) {
  var user = _ref3.user,
      device = _ref3.device,
      props = _objectWithoutProperties(_ref3, ["user", "device"]);

  return /*#__PURE__*/_react["default"].createElement(SessionLayout, props, user && /*#__PURE__*/_react["default"].createElement(_phone.PhonePlaceholder, null), device && /*#__PURE__*/_react["default"].createElement(_device.DevicePlaceholder, {
    margin: {
      left: user ? 1 : undefined
    }
  }));
};

exports.SessionPlaceholder = SessionPlaceholder;
var SessionPlaceholderProps = {
  user: _propTypes["default"].string,
  device: _propTypes["default"].string
};
exports.SessionPlaceholderProps = SessionPlaceholderProps;
SessionPlaceholder.propTypes = SessionPlaceholderProps;