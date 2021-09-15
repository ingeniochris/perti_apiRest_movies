'use strict'; //Models DB´s

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMovie = exports.allMoviesTitle = void 0;

var _Movie = _interopRequireDefault(require("../models/Movie"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var normalizeWord = title => {
  return title.toLowerCase();
};

var allMoviesTitle = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (title) {
    var movie = yield _Movie.default.findOne(title);
    return movie;
  });

  return function allMoviesTitle(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.allMoviesTitle = allMoviesTitle;

var createMovie = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (_ref2) {
    var {
      title,
      year,
      runtime,
      token
    } = _ref2;
    var newTitle = normalizeWord(title);

    try {
      var searchUser = yield _User.default.findOne({
        token
      });
      var searchMovie = yield _Movie.default.findOne({
        title: newTitle
      });
      if (searchMovie) return {
        msg: 'The movie already exists'
      };
      var newMovie = new _Movie.default({
        title: newTitle,
        year,
        runtime,
        user: yield searchUser.save()
      });
      var saveMovie = yield newMovie.save();
      return saveMovie;
    } catch (error) {
      throw new Error(error);
    }
  });

  return function createMovie(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createMovie = createMovie;