"use strict";

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

router.get("/", _Auth.AuthMiddleware, _moviesCtrl.searchMovies); //Route protected api/movies

router.post("/add", _Auth.AuthMiddleware, _ValidationInputs.validationMovie, _moviesCtrl.addMovie); //Route protected api/movies

router.put("/update/:id", _Auth.AuthMiddleware, _ValidationInputs.validationParams, _ValidationInputs.validationMovie, _moviesCtrl.updateMovie);
router.delete("/delete/:id", _Auth.AuthMiddleware, _ValidationInputs.validationParams, _moviesCtrl.deleteMovie);
var _default = router;
exports.default = _default;