'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authCtrl = require("../controllers/authCtrl");

var _usersCtrl = require("../controllers/usersCtrl");

var _Auth = require("../middleware/Auth");

var _ValidationInputs = require("../middleware/ValidationInputs");

//controllers
//middleware
//validation inputs AuthMiddleware
var router = (0, _express.Router)(); // route api/user/

router.post('/login', _ValidationInputs.validationLogin, _authCtrl.Authentic); // Route protected api/user/ 

router.get('/', _Auth.AuthMiddleware, _usersCtrl.getUsers);
var _default = router;
exports.default = _default;