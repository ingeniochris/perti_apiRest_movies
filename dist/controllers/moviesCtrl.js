'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMovie = exports.getMovies = void 0;

var _expressValidator = require("express-validator");

var _axios = _interopRequireDefault(require("../config/axios"));

var _Movies = require("../services/Movies");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getMovies = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var allMov = yield (0, _Movies.allMoviesTitle)(req.query);
      if (!allMov) return res.json({
        msg: "Title don´t match in Movies"
      });
      res.json(allMov);
    } catch (error) {
      throw new Error(error);
    }
  });

  return function getMovies(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getMovies = getMovies;

var addMovie = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    var token = req.header('x-auth-token');
    var errores = (0, _expressValidator.validationResult)(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array()
      });
    }

    try {
      var movie = yield (0, _Movies.createMovie)(_objectSpread(_objectSpread({}, req.body), {}, {
        token
      }));
      return res.status(201).json(movie);
    } catch (error) {
      console.error(error), next();
    }
  });

  return function addMovie(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addMovie = addMovie;