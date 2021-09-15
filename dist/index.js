'use strict';

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Main = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (app) {
    try {
      yield app.listen(app.get("port"));
      console.log("\n      ################################################\n      \uD83D\uDEE1\uFE0F  Server running on http://localhost:".concat(app.get("port"), " \uD83D\uDEE1\uFE0F\n      ################################################\n    "));
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  });

  return function Main(_x) {
    return _ref.apply(this, arguments);
  };
}();

Main(_app.default);