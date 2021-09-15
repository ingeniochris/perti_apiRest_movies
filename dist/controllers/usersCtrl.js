'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = void 0;

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    //const {email} = req.body;
    try {
      var user = yield _User.default.find();
      if (!user) next();
      res.json({
        user
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Have an error'
      });
    }
  });

  return function getUsers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;