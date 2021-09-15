'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  account: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Account"
  }
}, {
  timestamps: true
});

var _default = _mongoose.default.model("User", userSchema);

exports.default = _default;