'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _database = require("./config/database");

var _indexRoutes = require("./routes/index.routes.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var app = (0, _express.default)();
(0, _database.conn)(); //config port

app.set('port', process.env.PORT); //middleware

app.use((0, _helmet.default)());
app.use((0, _cors.default)());
app.use((0, _morgan.default)("dev"));
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.json()); // set headers

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, text/plain");
  next();
}); // Routes

app.use("/api/auth", _indexRoutes.authRoutes);
app.use("/api/user", _indexRoutes.userRoutes);
app.use("/api/movies", _indexRoutes.movieRoutes); // error middleware

app.use((error, req, res, next) => {
  console.log(error + "--------------------------");
  var statusCode = error.statusCode || 500;
  var message = error.message;
  var errorsPresent;

  if (error.errors) {
    errorsPresent = error.errors;
  }

  res.status(statusCode).json({
    message: message,
    errors: errorsPresent
  });
});
var _default = app;
exports.default = _default;