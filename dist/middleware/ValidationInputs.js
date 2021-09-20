"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationParams = exports.validationMovie = exports.validationLogin = exports.validationCreateUser = void 0;

var _expressValidator = require("express-validator");

var validationCreateUser = [(0, _expressValidator.check)("email", "Add valid email ").isEmail(), (0, _expressValidator.check)("firstName", "FirstName is required").not().isEmpty(), (0, _expressValidator.check)("lastName", "LastName is required").not().isEmpty(), (0, _expressValidator.check)("password", "The password is min 6 characters").isLength({
  min: 6
}), (0, _expressValidator.check)("confirmPassword", "The Confirm password is min 6 characters").isLength({
  min: 6
}), // check("role", "Add role , example.- ROLE_USER or ROLE_ADMIN ")
//   .not()
//   .isEmpty()
//   .toUpperCase(),
(0, _expressValidator.body)("confirmPassword").custom((value, _ref) => {
  var {
    req
  } = _ref;

  if (value !== req.body.password) {
    throw new Error("Password confirmation does not match password");
  }

  return true;
})];
exports.validationCreateUser = validationCreateUser;
var validationLogin = [(0, _expressValidator.check)("email", "Add valid email ").isEmail(), (0, _expressValidator.check)("password", "The password is min 6 characters").isLength({
  min: 6
})];
exports.validationLogin = validationLogin;
var validationMovie = [(0, _expressValidator.check)("title", "Add title ").not().isEmpty(), (0, _expressValidator.check)("year", "Add The year it was filmed").not().isEmpty(), (0, _expressValidator.check)("runtime", "Add the time the movie lasts").not().isEmpty()];
exports.validationMovie = validationMovie;
var validationParams = [(0, _expressValidator.param)("id").custom((value, _ref2) => {
  var {
    req
  } = _ref2;

  if (value !== req.params.id) {
    throw new Error("id is required into params url");
  }

  return true;
})];
exports.validationParams = validationParams;