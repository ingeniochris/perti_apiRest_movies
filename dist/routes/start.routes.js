'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _startCtrl = require("../controllers/startCtrl");

var router = (0, _express.Router)();
router.get('/', _startCtrl.startCtrl);
var _default = router;
exports.default = _default;