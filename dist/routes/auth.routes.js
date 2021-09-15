'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authCtrl = require("../controllers/authCtrl");

var _ValidationInputs = require("../middleware/ValidationInputs");

//controller 
//validation inputs middleware
var router = (0, _express.Router)(); // route  "api/auth"

router.post('/signup', _ValidationInputs.validationCreateUser, _authCtrl.SignupUser);
var _default = router;
exports.default = _default;