'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthMiddleware = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Account = _interopRequireDefault(require("../models/Account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var AuthMiddleware = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).json({
        msg: 'No Token, invalid permission'
      });
    }

    try {
      var verifyAccount = yield _Account.default.findOne({
        accountVerifyToken: token,
        accountVerifyTokenExpiration: {
          $gt: Date.now()
        }
      });
      if (!verifyAccount) res.status(403).json({
        msg: 'The token in the url is expired, don´t try to fool me'
      });

      var cifrado = _jsonwebtoken.default.verify(token, process.env.SECRETA);

      req.email = cifrado.email;
      next();
    } catch (error) {
      res.status(401).json({
        msg: 'Token no valid !!'
      });
    }
  });

  return function AuthMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.AuthMiddleware = AuthMiddleware;