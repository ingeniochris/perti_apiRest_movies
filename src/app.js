"use strict";

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import { conn } from "./config/database";

//Routes
import {
  startRoutes,
  authRoutes,
  userRoutes,
  movieRoutes,
} from "./routes/index.routes.js";

const app = express();
conn();

//config port
app.set("port", process.env.PORT);

//middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set headers
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, application/json");
//   next();
// });

// Routes
app.use("/", startRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/movies", movieRoutes);

// error middleware
app.use((error, req, res, next) => {
  console.log(error + "--------------------------");
  const statusCode = error.statusCode || 500;
  const message = error.message;
  let errorsPresent;
  if (error.errors) {
    errorsPresent = error.errors;
  }

  res.status(statusCode).json({ msg: message, errors: errorsPresent });
});

export default app;
