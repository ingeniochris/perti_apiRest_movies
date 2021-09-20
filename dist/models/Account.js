"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var accountSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  confirmPassword: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: 'ROLE_USER',
    enum: ["ROLE_USER", "ROLE_ADMIN"]
  },
  accountVerifyToken: String,
  accountVerifyTokenExpiration: Date
}, {
  timestamps: true
});

var _default = _mongoose.default.model("Account", accountSchema);

exports.default = _default;