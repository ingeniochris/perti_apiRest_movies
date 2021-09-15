"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clienteAxios = _axios.default.create({
  //URL Microservicios - variable global se encuentra en archivo .env
  baseURL: 'http://www.omdbapi.com/?t='
});

var _default = clienteAxios;
exports.default = _default;