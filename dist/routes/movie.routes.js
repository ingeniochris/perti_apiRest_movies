'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Auth = require("../middleware/Auth");

var _moviesCtrl = require("../controllers/moviesCtrl");

var _ValidationInputs = require("../middleware/ValidationInputs");

//middleware
var router = (0, _express.Router)(); //Route protected api/movies

router.get('/all', _Auth.AuthMiddleware, _moviesCtrl.getMovies); //Route protected api/movies

router.post('/add', _Auth.AuthMiddleware, _ValidationInputs.validationMovie, _moviesCtrl.addMovie);
var _default = router;
exports.default = _default;