"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "userRoutes", {
  enumerable: true,
  get: function get() {
    return _user.default;
  }
});
Object.defineProperty(exports, "authRoutes", {
  enumerable: true,
  get: function get() {
    return _auth.default;
  }
});
Object.defineProperty(exports, "movieRoutes", {
  enumerable: true,
  get: function get() {
    return _movie.default;
  }
});

var _user = _interopRequireDefault(require("./user.routes"));

var _auth = _interopRequireDefault(require("./auth.routes"));

var _movie = _interopRequireDefault(require("./movie.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }