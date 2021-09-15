'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUpdateToken = exports.createUser = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

var _Account = _interopRequireDefault(require("../models/Account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (_ref) {
    var {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      role
    } = _ref;
    var salt = yield _bcryptjs.default.genSalt(10);
    var passwordEncryp = yield _bcryptjs.default.hash(password, salt);
    var confirmPasswordEncryp = yield _bcryptjs.default.hash(confirmPassword, salt);
    var payload = {
      password
    };
    var token = yield _jsonwebtoken.default.sign(payload, process.env.SECRETA, {
      expiresIn: 3600
    });
    var account = new _Account.default({
      role,
      email,
      password: passwordEncryp,
      confirmPassword: confirmPasswordEncryp,
      accountVerifyToken: token,
      accountVerifyTokenExpiration: Date.now() + 3600000
    });
    var user = new _User.default({
      firstName,
      lastName,
      account: yield account.save()
    });
    var newUser = yield user.save();
    return newUser;
  });

  return function createUser(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var verifyUpdateToken = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (_ref3) {
    var {
      password,
      accountVerifyToken
    } = _ref3;
    var payload = {
      password
    };
    var token = yield _jsonwebtoken.default.sign(payload, process.env.SECRETA, {
      expiresIn: 3600
    });
    var queryUpdate = {
      accountVerifyToken: accountVerifyToken
    };
    yield _Account.default.findOneAndUpdate(queryUpdate, {
      $set: {
        accountVerifyToken: token,
        accountVerifyTokenExpiration: Date.now() + 3600000
      }
    });
    return token;
  });

  return function verifyUpdateToken(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.verifyUpdateToken = verifyUpdateToken;