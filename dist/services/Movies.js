"use strict"; //Models DB´s

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMovieService = exports.updateMovieService = exports.createMovieService = exports.titleMovieService = void 0;

var _Movie = _interopRequireDefault(require("../models/Movie"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * this convert all string to lowercase
 * @param {String} title
 * @returns {String} title lowercase
 */
var normalizeWord = title => {
  return title.toLowerCase();
};
/**
 * This search one movie in db
 * @param {Movie} title
 * @returns movie
 */


var titleMovieService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (titleUpdate) {
    console.log(titleUpdate.title);
    var movie = yield _Movie.default.find({
      title: {
        $in: titleUpdate.title
      }
    });
    return movie;
  });

  return function titleMovieService(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Add movie in DB
 * @param {String} title Movie title.
 * @param {String} year Movie year.
 * @param {String} runtime Movie runtime.
 * @param {String} token jwt Sesion.
 * @returns {Object} saveMovie
 */


exports.titleMovieService = titleMovieService;

var createMovieService = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (_ref2) {
    var {
      title,
      year,
      runtime,
      token
    } = _ref2;
    var normalizeTitle = normalizeWord(title);

    try {
      var searchUser = yield _User.default.findOne({
        token
      });
      var searchMovie = yield _Movie.default.findOne({
        title: normalizeTitle
      });
      if (searchMovie) return {
        msg: "The movie already exists"
      };
      var newMovie = new _Movie.default({
        title: normalizeTitle,
        year,
        runtime,
        user: yield searchUser.save()
      });
      var saveMovie = yield newMovie.save();
      return saveMovie;
    } catch (error) {
      console.error(error);
    }
  });

  return function createMovieService(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Update Movie
 * @param {ObjectId} id
 * @param {String} title Movie title.
 * @param {String} year Movie year.
 * @param {String} runtime Movie runtime.
 * @param {String} token jwt Sesion.
 * @returns {json} msg message
 */


exports.createMovieService = createMovieService;

var updateMovieService = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (id, _ref4) {
    var {
      title,
      year,
      runtime,
      token
    } = _ref4;

    try {
      var searchUser = yield _User.default.findOne({
        token
      });
      var searchMovieId = yield _Movie.default.findByIdAndUpdate(id, {
        $set: {
          title,
          year,
          runtime,
          user: yield searchUser.save()
        }
      });
      if (!searchMovieId) return {
        msg: 'the movie has not been found'
      };
      return {
        msg: "the movie has been updated successfully"
      };
    } catch (error) {
      console.error(error);
      return {
        msg: "Movie don´t updating"
      };
    }
  });

  return function updateMovieService(_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Delete Movie
 * @param {ObjectId} id
 * @returns {Json} msg message
 */


exports.updateMovieService = updateMovieService;

var deleteMovieService = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (id) {
    try {
      var movie = yield _Movie.default.deleteOne({
        _id: id
      });
      if (movie.deletedCount < 1) return {
        msg: 'the movie has not been found'
      };
      return {
        msg: "Movie deleted successfully"
      };
    } catch (error) {
      console.error(error);
      return {
        msg: "Movie don´t deleting"
      };
    }
  });

  return function deleteMovieService(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteMovieService = deleteMovieService;