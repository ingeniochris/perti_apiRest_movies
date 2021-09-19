"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  year: {
    type: String,
    required: true,
    trim: true,
    unique: false
  },
  runtime: {
    type: String,
    required: true,
    trim: true,
    unique: false
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

var _default = _mongoose.default.model("Movie", movieSchema);

exports.default = _default;