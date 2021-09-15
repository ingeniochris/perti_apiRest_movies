'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Authentic = exports.SignupUser = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _expressValidator = require("express-validator");

var _Account = _interopRequireDefault(require("../models/Account"));

var _Users = require("../services/Users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SignupUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var errores = (0, _expressValidator.validationResult)(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array()
      });
    }

    var {
      email
    } = req.body;

    try {
      var haveUser = yield _Account.default.findOne({
        email
      });

      if (haveUser) {
        return res.status(400).json({
          msg: "El usuario ya existe"
        });
      } else {
        var newUser = yield (0, _Users.createUser)(_objectSpread({}, req.body));
        return res.status(201).json({
          msg: "User signed-up successfully",
          newUser
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "have an error",
        error
      });
    }
  });

  return function SignupUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.SignupUser = SignupUser;

var Authentic = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    var errores = (0, _expressValidator.validationResult)(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array()
      });
    }

    var {
      email,
      password
    } = req.body;

    try {
      var haveUser = yield _Account.default.findOne({
        email
      });

      if (!haveUser) {
        return res.status(400).json({
          msg: "El usuario no existe"
        });
      }

      ;
      var {
        accountVerifyToken
      } = haveUser;
      var passCorrect = yield _bcryptjs.default.compare(password, haveUser.password);

      if (!passCorrect) {
        return res.status(400).json({
          msg: "Password Incorrecto"
        });
      }

      ;
      var token = yield (0, _Users.verifyUpdateToken)(_objectSpread(_objectSpread({}, req.body), {}, {
        accountVerifyToken
      }));
      return res.json(token);
    } catch (error) {
      console.log(error);
      res.status(400).send("Have an error");
    }

    ;
  });

  return function Authentic(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.Authentic = Authentic;